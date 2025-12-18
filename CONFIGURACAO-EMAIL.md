# Configuração de Envio de E-mails - Pizzaria Paulista

## 📧 Como Funciona o Sistema de Contato

O formulário de contato do site está configurado para enviar **dois e-mails automaticamente**:

1. **Para a pizzaria** (contato@pizzariapaulista.com.br): Contém todos os dados enviados pelo cliente
2. **Para o cliente**: E-mail de confirmação com cópia dos dados enviados

---

## 🔧 Configuração do Google Workspace

Para que os e-mails sejam enviados corretamente pelo seu Google Workspace, siga estas opções:

### **Opção 1: Usando a função mail() do PHP (Requer servidor com PHP)**

O arquivo `enviar-email.php` já está pronto e usa a função nativa `mail()` do PHP.

**Requisitos:**
- Servidor web com PHP instalado (Apache, Nginx, etc.)
- Configuração SMTP no servidor

**Passos:**
1. Faça upload de todos os arquivos para seu servidor web
2. Configure o SMTP no servidor para usar o Google Workspace
3. O formulário funcionará automaticamente

---

### **Opção 2: Usando SMTP do Google Workspace (Recomendado)**

Para melhor confiabilidade, recomendo usar uma biblioteca PHP como PHPMailer com SMTP.

**Instalar PHPMailer:**
```bash
composer require phpmailer/phpmailer
```

**Arquivo alternativo: `enviar-email-smtp.php`**
```php
<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ... (código de recebimento de dados) ...

$mail = new PHPMailer(true);

try {
    // Configurações SMTP Google Workspace
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contato@pizzariapaulista.com.br';
    $mail->Password = 'SUA_SENHA_APP_GOOGLE'; // Senha de app do Google
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // E-mail para a pizzaria
    $mail->setFrom('contato@pizzariapaulista.com.br', 'Site Pizzaria Paulista');
    $mail->addAddress('contato@pizzariapaulista.com.br');
    $mail->addReplyTo($email, $nome);
    
    $mail->isHTML(true);
    $mail->Subject = "Novo Contato - $assunto";
    $mail->Body = $mensagemPizzaria;
    
    $mail->send();
    
    // E-mail para o cliente
    $mail->clearAddresses();
    $mail->addAddress($email, $nome);
    $mail->Subject = "Recebemos sua mensagem - Pizzaria Paulista";
    $mail->Body = $mensagemCliente;
    
    $mail->send();
    
    echo json_encode(['success' => true, 'message' => 'Mensagem enviada!']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar.']);
}
?>
```

**Criar senha de app no Google:**
1. Acesse: https://myaccount.google.com/security
2. Ative a verificação em duas etapas
3. Vá em "Senhas de app"
4. Gere uma senha para "Outro (nome personalizado)"
5. Use essa senha no código

---

### **Opção 3: Serviço de E-mail Externo (Mais Simples)**

Use um serviço como **FormSubmit**, **EmailJS** ou **SendGrid** (não requer servidor PHP).

**Usando FormSubmit (Grátis e Simples):**

Altere o formulário em `contato.html`:
```html
<form action="https://formsubmit.co/contato@pizzariapaulista.com.br" method="POST">
    <!-- Configurações do FormSubmit -->
    <input type="hidden" name="_subject" value="Novo Contato do Site">
    <input type="hidden" name="_cc" value="{{email_digitado_pelo_cliente}}">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_next" value="https://seusite.com/obrigado.html">
    
    <!-- Campos normais -->
    <input type="text" name="nome" required>
    <!-- ... outros campos ... -->
</form>
```

---

## 📁 Arquivos Criados

- `contato.html` - Página com formulário e mapa
- `enviar-email.php` - Script PHP para envio
- `css/style.css` - Estilos da página de contato
- `js/main.js` - JavaScript para validação e envio assíncrono

---

## ✅ Funcionalidades Implementadas

### No Formulário:
- ✅ Validação de todos os campos
- ✅ Máscara automática para telefone
- ✅ Validação de e-mail
- ✅ Feedback visual (loading, sucesso, erro)
- ✅ Envio assíncrono (sem recarregar página)
- ✅ Design responsivo

### Nos E-mails:
- ✅ HTML responsivo e profissional
- ✅ Cores da marca (Marsala e Verde)
- ✅ E-mail para pizzaria com todos os dados
- ✅ E-mail de confirmação para cliente
- ✅ Informações de contato no rodapé

---

## 🚀 Para Testar Localmente

Se quiser testar antes de colocar no servidor:

1. Instale um servidor PHP local (XAMPP, WAMP, Laragon)
2. Coloque os arquivos na pasta do servidor
3. Acesse via localhost
4. Configure o SMTP ou use a função mail()

---

## 📞 Suporte

Em caso de dúvidas sobre a configuração:
- Consulte a documentação do Google Workspace
- Entre em contato com seu provedor de hospedagem
- Considere contratar um desenvolvedor para configuração do SMTP

---

## 🎨 Personalização

O design está usando as cores da pizzaria:
- **Marsala**: #8B1F41
- **Verde Escuro**: #1B5E20
- Layout em 2 colunas (mapa + formulário)
- Totalmente responsivo

Todos os estilos estão no arquivo `css/style.css` e podem ser personalizados conforme necessário.
