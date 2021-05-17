export interface TreeNode {
	[key: string]: any;
	id: string;
	children: TreeNode[];
	name: string;
	path: string;
	isCompleted: boolean;
}
