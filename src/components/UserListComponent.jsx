import UserCard from "./UserCard";

function UserListComponent({ usuarios }) {
    if (usuarios.length === 0) {
        return <p className="empty-message">Nenhum usuário encontrado.</p>;
    }

    return (
        <ul className="user-list">
            {usuarios.map((usuario) => (
                <UserCard key={usuario.id} usuario={usuario} />
            ))}
        </ul>
    );
}

export default UserListComponent;