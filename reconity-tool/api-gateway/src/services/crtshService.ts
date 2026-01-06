import axios from 'axios';

interface CrtShResult {
    name_value: string;
}

export const fetchSubdomains = async (domain: string): Promise<string[]> => {
    try {
        const response = await axios.get<CrtShResult[]>(`https://crt.sh/?q=%.${domain}&output=json`);

        // Extract subdomains, dedup, and clean
        const subdomains = new Set<string>();

        response.data.forEach(item => {
            const names = item.name_value.split('\n');
            names.forEach(name => {
                if (!name.includes('*')) {
                    subdomains.add(name.toLowerCase());
                }
            });
        });

        return Array.from(subdomains);
    } catch (error) {
        console.error('crt.sh query failed:', error);
        return [];
    }
};
