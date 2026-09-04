function UserCard({ usuario }) {
    return (
        <li className="user-card">
            <strong className="user-card__name">{usuario.name}</strong>
        </li>
    );
}

export default UserCard;