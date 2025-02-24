export interface News {
	id:         string;
	createdAt:  string;
	updatedAt:  string;
	deletedAt:  null | string;
	title:      string;
	content:    string;
	rawContent: string;
	author:     string;
}