import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './style.css'


export default class Register extends React.Component {
    state = {
        name: null,
        email: null,
        whatsapp: null,
        city: null,
        uf: null,
    }

    handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/ongs', this.state)
            alert(`Seu ID de acesso é: ${response.data.id}`)

            this.props.history.push('/')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.')
        }

    }

    render() {
        return (
            <div className="register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero" />
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                        <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#E02041" />
                             Não tenho cadastro
                        </Link>
                    </section>

                    <form onSubmit={this.handleRegister}>
                        <input
                            required
                            placeholder="Nome da ONG"
                            onChange={e => this.setState({ name: e.target.value })}
                            type="text" />
                        <input
                            required
                            placeholder="E-mail"
                            onChange={e => this.setState({ email: e.target.value })}
                            type="email" />
                        <input
                            required
                            placeholder="WhatsApp"
                            onChange={e => this.setState({ whatsapp: e.target.value })}
                            type="text" />
                        <div className="input-group">
                            <input
                                required
                                placeholder="Cidade"
                                onChange={e => this.setState({ city: e.target.value })}
                                type="text"
                                style={{ width: 'calc(100% - 80px)' }} />
                            <input
                                required
                                placeholder="UF"
                                onChange={e => this.setState({ uf: e.target.value })}
                                type="text"
                                style={{ width: 80 }} />
                        </div>
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        )
    }
}