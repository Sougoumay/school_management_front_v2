// src/services/MemberService.ts
export interface Member {
    lastName: string;
    firstName: string;
    email: string;
    age: number;
}

const API_URL = process.env.REACT_APP_API_URL;
export const getMembers = async (type: string = '',query: string = ''): Promise<Member[]> => {
    try {
        let url = type ? `${API_URL}/api/members?type=${type}` : `${API_URL}/api/members`;
        if (query) {
            url = type ? `${url}&query=${query}` : `${url}?query=${query}`;
        }
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch members');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
