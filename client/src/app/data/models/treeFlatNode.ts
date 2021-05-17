import { TreeNode } from "@data/models/treeNode";

export interface TreeFlatNode {
	id: string;
	name: string;
	level: number;
	expandable: boolean;
	isSelected: boolean;
	children: TreeNode[];
}
