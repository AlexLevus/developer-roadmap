import { TreeNode } from "@data/models/treeNode";

export interface TreeFlatNode {
	id: string;
	name: string;
	level: number;
	path: string;
	expandable: boolean;
	isSelected: boolean;
	children: TreeNode[];
}
