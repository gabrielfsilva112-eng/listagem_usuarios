export default function UserCardComponent({ usuario, onSelecionarUsuario, onDeletarUsuario }) {
    return (
        <li className="user-card">
            <strong className="user-name">{usuario.name}</strong>
            <p className="user-email">{usuario.email}</p>
            <p className="user-username">@{usuario.username}</p>

            <div className="user-card__actions">
                <button
                    onClick={() => {
                        onSelecionarUsuario(usuario.id);
                    }}
                >
                    Ver detalhes
                </button>

                <button
                    className="btn-delete"
                    onClick={() => {
                        onDeletarUsuario(usuario.id);
                    }}
                >
                    Deletar
                </button>
            </div>
        </li>
    );
}