import React, {useState, useEffect} from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, response}) => {
  if (!isOpen) return null;
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const statuEmpresa = JSON.stringify(response);
    console.log(statuEmpresa);

    if (statuEmpresa.includes('Irregular')) {
      setMsg('A empresa está no status Irregular. Isso indica que as ações atuais podem não estar alinhadas com as melhores práticas para manter a regularidade. Sugerimos revisar as obrigações e ajustar as atividades para fortalecer a operação.');
    }
    else if (statuEmpresa.includes('Encerrada')) {
      setMsg('Atualmente, a empresa apresenta um perfil que a coloca em Encerramento. Esse resultado sugere que as ações recentes podem estar desviando a MEI do caminho ideal. Avalie o planejamento e considere ações corretivas para assegurar a continuidade.')
    }
    else if (statuEmpresa.includes('Ativa')) {
      setMsg('A empresa está no status Ativo! As ações atuais indicam que ela está se mantendo no caminho certo para uma operação estável e regular. Continue acompanhando as atividades para preservar esse status.')
    }
    else {
      setMsg('Sem resposta')
    }
  }, [response]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Status da Empresa</h2>
          <button onClick={onClose} className={styles.closeButton}>FECHAR</button>
        </div>

        <div className={styles.modalBody}>{msg}</div>
      </div>
    </div>
  );
};

export default Modal;
