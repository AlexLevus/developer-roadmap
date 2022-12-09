import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import * as depthLimit from 'graphql-depth-limit';

import schemaDirectives from './schemaDirectives';
import { verifyToken } from '@auth';

import {
  NODE_ENV,
  PRIMARY_COLOR,
  GRAPHQL_DEPTH_LIMIT,
  ACCESS_TOKEN
} from '@environments';
import { join } from 'path';

const pubsub = new PubSub();

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/generator/graphql.models.ts'),
        outputAs: 'class'
      },
      context: async ({ req, res, connection }) => {
        if (connection) {
          const { currentUser } = connection.context;

          return {
            pubsub,
            currentUser
          };
        }

        let currentUser;

        const token = req.headers[ACCESS_TOKEN!] || '';

        if (token) {
          currentUser = await verifyToken(token, 'accessToken');
        }

        return {
          req,
          res,
          pubsub,
          currentUser,
          trackErrors(errors) {
            // Track the errors
            // console.log(errors)
          }
        };
      },
      bodyParserConfig: { limit: '50mb' },
      schemaDirectives,
      validationRules: [
        depthLimit(
          GRAPHQL_DEPTH_LIMIT!,
          { ignore: [/_trusted$/, 'idontcare'] },
          (depths) => {
            if (depths[''] === GRAPHQL_DEPTH_LIMIT! - 1) {
              Logger.warn(
                `⚠️  You can only descend ${GRAPHQL_DEPTH_LIMIT!} levels.`,
                'GraphQL',
                false
              );
            }
          }
        )
      ],
      introspection: true,
      playground: NODE_ENV !== 'production' && {
        settings: {
          'editor.cursorShape': 'underline', // possible values: 'line', 'block', 'underline'
          'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          'editor.fontSize': 14,
          'editor.reuseHeaders': true, // new tab reuses headers from last tab
          'editor.theme': 'dark', // possible values: 'dark', 'light'
          'general.betaUpdates': true,
          'queryPlan.hideQueryPlanResponse': false,
          'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
          'tracing.hideTracingResponse': false
        }
      },
      tracing: NODE_ENV !== 'production',
      cacheControl: NODE_ENV === 'production' && {
        defaultMaxAge: 5,
        stripFormattedExtensions: false,
        calculateHttpHeaders: false
      },
      uploads: {
        maxFieldSize: 2, // 1mb
        maxFileSize: 20, // 20mb
        maxFiles: 5
      }
    };
  }
}
