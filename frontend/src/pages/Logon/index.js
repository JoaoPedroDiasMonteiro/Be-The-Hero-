import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'


import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default class Logon extends React.Component {
    state = {
        id: null
    }

    handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post('/session', this.state)
            localStorage.setItem('ongID', this.state.id)
            localStorage.setItem('ongName', response.data.name)

            this.props.history.push('/profile')
        } catch (error) {
            alert('Falha no login, tente novamente.')
        }
    }

    render() {
        return (
            <div className="logon-container">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero" title="Be The Hero" />
                    <form onSubmit={this.handleLogin}>
                        <h1>Faça seu Logon</h1>
                        <input
                            onChange={e => this.setState({ id: e.target.value })}
                            placeholder="Sua ID"
                            type="text" />
                        <button className="button">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#E02041" />
                             Não tenho cadastro
                        </Link>
                    </form>
                </section>
                <img src={heroesImg} alt="heroes" />
            </div>

        )
    }
}