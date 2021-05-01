export interface TreeFlatNode {
	name: string;
	level: number;
	expandable: boolean;
	children?: TreeFlatNode[];
}
