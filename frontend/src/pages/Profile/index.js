import React from 'react'
import { Link } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './style.css'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'


export default class Profile extends React.Component {
    state = {
        ongName: null,
        ongID: null,
        incidents: []
    }

    componentDidMount() {
        const ongName = localStorage.getItem('ongName')
        const ongID = localStorage.getItem('ongID')

        this.setState({ ongName })
        this.setState({ ongID })

        api.get('/profile', {
            headers: {
                Authorization: ongID
            }
        }).then(response => {
            this.setState({ incidents: response.data })
        })
    }

    async handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: this.state.ongID
                }
            })
            this.setState({ incidents: this.state.incidents.filter(incident => incident.id !== id) })
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    handleLogout = () => {
        localStorage.clear()

        this.props.history.push('/')
    }

    render() {
        return (
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be The Hero" />
                    <span>Bem vinda, {this.state.ongName}</span>

                    <div className="actions">
                        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                        <button onClick={this.handleLogout}>
                            <FiPower size={18} color="#E02041"></FiPower>
                        </button>
                    </div>

                </header>

                <h1>Casos Cadastrados:</h1>

                <ul>
                    {this.state.incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>


                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button type="button" onClick={() => { this.handleDeleteIncident(incident.id) }}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }
}