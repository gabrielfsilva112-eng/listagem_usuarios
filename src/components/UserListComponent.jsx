import UserCard from "./UserCardComponent";

function UserListComponent({ usuarios, onSelecionarUsuario, onDeletarUsuario }) {
    if (usuarios.length === 0) {
        return <p className="empty-message">Nenhum usuário encontrado.</p>;
    }

    return (
        <ul className="user-list">
            {usuarios.map((usuario) => (
                <UserCard
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={onSelecionarUsuario}
                    onDeletarUsuario={onDeletarUsuario}
                />
            ))}
        </ul>
    );
}

export default UserListComponent;