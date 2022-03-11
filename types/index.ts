export interface testimonial {
	id: number;
	image: string;
	name: string;
	job: string;
	message: string;
}

export type testimonials = testimonial[];

export interface Post {
	id: string;
	title: string;
	cover: string;
	seo_description: string;
	summary: string;
	contentHtml: string;
	date: string;
}

export type Posts = Post[];

// Hooks
export interface useFormValues {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	resetPassword?: string;
}
