function LoadingComponent({ loading }) {
    if (!loading) return null;

    return <p className="loading">Carregando usuários...</p>;
}

export default LoadingComponent;