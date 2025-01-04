import React, { useState, useEffect } from 'react';
import { getMembers, Member } from '../services/MemberService';
import './MemberList.css';

const MemberList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);  // Liste des membres
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Nouveaux états pour les deux champs du formulaire
    const [type, setType] = useState<string>('');       // Champ type
    const [query, setQuery] = useState<string>('');       // Champ query
    const [inputType, setInputType] = useState<string>('');  // Valeur temporaire pour type
    const [inputQuery, setInputQuery] = useState<string>('');  // Valeur temporaire pour query

    // Fonction pour gérer la soumission du formulaire
    const handleSearchSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Empêche le rechargement de la page
        setType(inputType); // Mise à jour de type avec la valeur temporaire
        setQuery(inputQuery); // Mise à jour de query avec la valeur temporaire
        await fetchMembers(inputType, inputQuery); // Appel avec les deux paramètres
    };

    // Fonction pour récupérer les membres en fonction de type et query
    const fetchMembers = async (type: string, query: string) => {
        setLoading(true);  // Activation du loading
        try {
            const membersData = await getMembers(type, query);  // Appel du service avec les deux paramètres
            setMembers(membersData);
        } catch (err) {
            setError('Failed to load members');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers(type, query); // Chargement initial avec les valeurs actuelles
    }, [type,query]); // Appel uniquement au montage initial

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {/* Formulaire avec deux champs */}
            <form onSubmit={handleSearchSubmit}>
                {/* Champ type */}
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)} // Mise à jour de la valeur temporaire type
                />

                {/* Champ query */}
                <label htmlFor="searchQuery">Query:</label>
                <input
                    type="text"
                    id="searchQuery"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)} // Mise à jour de la valeur temporaire query
                />

                <button type="submit">Search</button>
            </form>

            {/* Table des membres */}
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.email}>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.email}</td>
                        <td>{member.age}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberList;
