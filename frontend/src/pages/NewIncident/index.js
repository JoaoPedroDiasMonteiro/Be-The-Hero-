import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import './style.css'

import api from '../../services/api'

export default class NewIncident extends React.Component {
    state = {
        title: null,
        description: null,
        value: null
    }

    handleNewIncident = async (e) => {
        e.preventDefault()
        console.log(this.state);
        try {
            await api.post('/incidents', this.state, {
                headers: { Authorization: localStorage.getItem('ongID') }
            })
            // alert('Cadastrado com sucesso!')
            this.props.history.push('/profile')
        } catch (error) {
            alert('Erro, tente novamente.')
        }
    }

    render() {
        return (
            <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero" />
                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                             Voltar para home
                        </Link>
                    </section>
                    <form onSubmit={this.handleNewIncident}>
                        <input
                            required
                            onChange={e => this.setState({ title: e.target.value })}
                            placeholder="Nome da ONG"
                            type="text" />
                        <textarea
                            required
                            onChange={e => this.setState({ description: e.target.value })}
                            placeholder="Descrição" />
                        <input
                            required
                            onChange={e => this.setState({ value: e.target.value })}
                            placeholder="Valor em reais" type="text" />
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>

        )
    }
}