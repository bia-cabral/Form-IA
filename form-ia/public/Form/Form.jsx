import React, { useState } from 'react';
import { ufOptions, porteEmpresaOptions, cnaesOptions, naturezaJuridicaOptions } from '../Data/Data'
import styles from './Form.module.css';
import Modal from '../Modal/Modal.jsx'

const FormComponent = () => {
    const [formData, setFormData] = useState({
        email: '',
        nome_empresa: '',
        uf: '',
        porte_empresa: '',
        capital_social: '',
        municipios: '',
        cnaes: '',
        natureza_juridica: '',
        ano_inicio_ativ: '',
        mes_inicio_ativ: '',
        dia_inicio_ativ: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpen(true);
        console.log("Dados enviados:", formData);

        const result = await sendData();
        setResponse(result);
    };

    const sendData = async () => {
        try {
            const response = await fetch('https://api-ai-inter.onrender.com/getResponse/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const result = await response.json();

            if (result && Object.keys(result).length > 0) {
                setIsModalOpen(true);
            } else {
                console.log("Sem dados válidos na resposta");
            }

            return result;
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [response, setResponse] = useState(null);

    return (
        <div>
            <section className={styles.formContainer}>
                <header className={styles.formTitle}>Pesquisa BiMO</header>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputBox}>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className={styles.inputBox}>
                        <label>Nome da Empresa:</label>
                        <input type="text" name="nome_empresa" value={formData.nome_empresa} onChange={handleChange} required />
                    </div>
                    <div className={styles.row}>
                        <div className={`${styles.inputBox} ${styles.col}`}>
                            <select name="uf" value={formData.uf} onChange={handleChange} required>
                                <option hidden="">UF (Estado):</option>
                                {ufOptions.map((uf, index) => (
                                    <option key={index} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles.inputBox} ${styles.col}`}>
                            <select name="porte_empresa" value={formData.porte_empresa} onChange={handleChange} required>
                                <option hidden="">Porte da Empresa:</option>
                                {porteEmpresaOptions.map((porte, index) => (
                                    <option key={index} value={porte}>{porte}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Capital Social:</label>
                        <input type="number" name="capital_social" value={formData.capital_social} onChange={handleChange} required />
                    </div>
                    <div className={styles.inputBox}>
                        <label>Município:</label>
                        <input type="text" name="municipios" value={formData.municipios} onChange={handleChange} placeholder="Digite sem acentos" required />
                    </div>
                    <div className={styles.row}>
                        <div className={`${styles.inputBox} ${styles.col}`}>
                            <select name="cnaes" value={formData.cnaes} onChange={handleChange} required>
                                <option hidden="">CNAE (Classificação Nacional das Atividades Econômicas):</option>
                                {cnaesOptions.map((cnae, index) => (
                                    <option key={index} value={cnae}>{cnae}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles.inputBox} ${styles.col}`}>
                            <select name="natureza_juridica" value={formData.natureza_juridica} onChange={handleChange} required>
                                <option hidden="">Natureza Jurídica:</option>
                                {naturezaJuridicaOptions.map((natureza, index) => (
                                    <option key={index} value={natureza}>{natureza}</option>
                                ))}
                            </select>
                        </div>
                    </div>
            
                    <div className={styles.dateInputs}>
                        <div className={styles.inputBox}>
                            <label>Ano de Início da Atividade:</label>
                            <input type="number" name="ano_inicio_ativ" value={formData.ano_inicio_ativ} onChange={handleChange} required />
                        </div>
                        <div className={styles.inputBox}>
                            <label>Mês de Início da Atividade:</label>
                            <input type="number" name="mes_inicio_ativ" value={formData.mes_inicio_ativ} onChange={handleChange} required />
                        </div>
                        <div className={styles.inputBox}>
                            <label>Dia de Início da Atividade:</label>
                            <input type="number" name="dia_inicio_ativ" value={formData.dia_inicio_ativ} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </section>
            
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                response={response}
                onConfirm={() => {
                    sendData();
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
};

export default FormComponent;
