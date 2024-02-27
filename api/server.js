const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configurações do servidor de e-mail (SMTP)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Porta SMTP
    secure: true, // true para SSL, false para TLS
    service: 'gmail',
    auth: {
        user: process.env.API_EMAIL,
        pass: process.env.API_SENHA
    }
});

app.use(cors());

// Rota para enviar e-mails
app.post('/enviar-email', (req, res) => {
    const { destinatario, assunto, corpo } = req.body;

    // Definições do e-mail
    const mailOptions = {
        from: process.env.API_EMAIL,
        to: destinatario,
        subject: assunto,
        text: corpo
    };

    // Enviar e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).send('Erro ao enviar e-mail');
        } else {
            console.log('E-mail enviado com sucesso:', info.response);
            res.status(200).send('E-mail enviado com sucesso');
        }
    });
});

app.get('/teste', () => {
    res.send('deu certo o get');
})

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;