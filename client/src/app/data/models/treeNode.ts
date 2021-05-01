export interface TreeNode {
	[key: string]: any;
	children: TreeNode[];
	name: string;
	path: string;
}
