import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "./components/HeaderComponent";
import UserListComponent from "./components/UserListComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserForm from "./components/UserForm";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import Modal from "./components/Modal";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();

    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};

export default function App() {
    const url = "https://jsonplaceholder.typicode.com";
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [novoUsuario, setNovoUsuario] = useState(null);
    const [erroCadastro, setErroCadastro] = useState(null);
    const [formularioAberto, setFormularioAberto] = useState(false);

    const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca));

    async function buscarUsuario(id) {
        try {
            const response = await axios.get(`${url}/users/${id}`);
            const data = response.data;
            setUsuarioSelecionado(data);
        } catch (error) {
            console.log("Erro ao buscar usuário: ", error);
            setError(`Não foi possível carregar os detalhes - ${error.message}`);
        }
    }

    async function buscarUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(`${url}/users`);
            const data = response.data;

            setUsuarios(data);
        } catch (error) {
            console.log("Error when fetching user: ", error);
            setError(`Users were not loaded - ${error.message}`);
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null);
    }

    function abrirFormulario() {
        setFormularioAberto(true);
    }

    function fecharFormulario() {
        setFormularioAberto(false);
        setErroCadastro(null);
        setNovoUsuario(null);
    }

    async function cadastrarUsuario(usuario) {
        try {
            const response = await axios.post(`${url}/users`, usuario);
            const data = response.data;
            setNovoUsuario(data);
            setErroCadastro(null);
        } catch (error) {
            console.log("Erro ao cadastrar usuário: ", error);
            setErroCadastro(`Não foi possível cadastrar o usuário - ${error.message}`);
            setNovoUsuario(null);
        }
    }

    async function deletarUsuario(id) {
        try {
            await axios.delete(`${url}/users/${id}`);
            setUsuarios((usuariosAtuais) =>
                usuariosAtuais.filter((usuario) => usuario.id !== id)
            );
        } catch (error) {
            console.log("Erro ao deletar usuário: ", error);
            setError(`Não foi possível deletar o usuário - ${error.message}`);
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div className="app-container">
            <HeaderComponent titulo="Catálogo de Usuários" />

            <input
                className="search-input"
                type="text"
                placeholder="Filtrar usuário..."
                onChange={(evento) => setBusca(evento.target.value)}
            />

            <LoadingComponent loading={carregando} />

            <p className="user-count">
                Usuários encontrados: {usuarios.length}
            </p>

            {error && <ErrorMessage mensagem={error} />}

            {!carregando && !error && (
                <>
                    {usuariosFiltrados.length > 0 ? (
                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                            onDeletarUsuario={deletarUsuario}
                        />
                    ) : (
                        <p className="empty-message">
                            Nenhum usuário encontrado.
                        </p>
                    )}

                    <Modal isOpen={!!usuarioSelecionado} onClose={limparDetalhesUsuario}>
                        {usuarioSelecionado && (
                            <UserDetailsComponent
                                usuario={usuarioSelecionado}
                                onFecharDetalhes={limparDetalhesUsuario}
                            />
                        )}
                    </Modal>

                    <button className="btn-criar-usuario" onClick={abrirFormulario}>
                        + Criar usuário
                    </button>

                    <Modal isOpen={formularioAberto} onClose={fecharFormulario}>
                        <h2>Novo usuário</h2>
                        <UserForm onCadastrar={cadastrarUsuario} />

                        {erroCadastro && <ErrorMessage mensagem={erroCadastro} />}

                        {novoUsuario && (
                            <>
                                <SuccessMessage mensagem="Usuário cadastrado com sucesso!" />
                                <NovoUsuarioComponent novoUsuario={novoUsuario} />
                            </>
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
}