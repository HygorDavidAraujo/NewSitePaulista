<?php
// ===================================
// PIZZARIA PAULISTA - ENVIO DE EMAIL
// ===================================

// Configurações de segurança e CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Responder pré-flight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Receber dados do formulário
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$telefone = isset($_POST['telefone']) ? trim($_POST['telefone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$assunto = isset($_POST['assunto']) ? trim($_POST['assunto']) : '';
$mensagem = isset($_POST['mensagem']) ? trim($_POST['mensagem']) : '';

// Validação básica
if (empty($nome) || empty($telefone) || empty($email) || empty($assunto) || empty($mensagem)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios']);
    exit;
}

// Validar e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'E-mail inválido']);
    exit;
}

// Sanitizar dados
$nome = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');
$telefone = htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$assunto = htmlspecialchars($assunto, ENT_QUOTES, 'UTF-8');
$mensagem = htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8');

// E-mail da pizzaria
$emailPizzaria = 'contato@pizzariapaulista.com.br';

// ===================================
// EMAIL 1: PARA A PIZZARIA
// ===================================

$assuntoPizzaria = "Novo Contato pelo Site - $assunto";

$mensagemPizzaria = "
<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: linear-gradient(135deg, #8B1F41, #1B5E20); color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
        .info-row { margin: 15px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #8B1F41; }
        .info-label { font-weight: bold; color: #8B1F41; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🍕 Pizzaria Paulista</h1>
            <p>Nova Mensagem do Site</p>
        </div>
        <div class='content'>
            <h2>Detalhes do Contato:</h2>
            
            <div class='info-row'>
                <span class='info-label'>Nome:</span> $nome
            </div>
            
            <div class='info-row'>
                <span class='info-label'>Telefone:</span> $telefone
            </div>
            
            <div class='info-row'>
                <span class='info-label'>E-mail:</span> $email
            </div>
            
            <div class='info-row'>
                <span class='info-label'>Assunto:</span> $assunto
            </div>
            
            <div class='info-row'>
                <span class='info-label'>Mensagem:</span><br>
                " . nl2br($mensagem) . "
            </div>
            
            <p style='margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;'>
                <strong>⏰ Data/Hora:</strong> " . date('d/m/Y H:i:s') . "
            </p>
        </div>
        <div class='footer'>
            <p>Este e-mail foi enviado automaticamente pelo formulário de contato do site.<br>
            Pizzaria Paulista - Avenida D, nº 616, Setor Oeste, Goiânia - GO - CEP 74140-160</p>
        </div>
    </div>
</body>
</html>
";

// Cabeçalhos para o e-mail da pizzaria
$headersPizzaria = "MIME-Version: 1.0\r\n";
$headersPizzaria .= "Content-type: text/html; charset=UTF-8\r\n";
$headersPizzaria .= "From: Site Pizzaria Paulista <noreply@pizzariapaulista.com.br>\r\n";
$headersPizzaria .= "Reply-To: $email\r\n";

// ===================================
// EMAIL 2: CONFIRMAÇÃO PARA O CLIENTE
// ===================================

$assuntoCliente = "Recebemos sua mensagem - Pizzaria Paulista";

$mensagemCliente = "
<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: linear-gradient(135deg, #8B1F41, #1B5E20); color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 30px; margin-top: 20px; border-radius: 8px; }
        .info-row { margin: 15px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #1B5E20; }
        .info-label { font-weight: bold; color: #1B5E20; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
        .success-box { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🍕 Pizzaria Paulista</h1>
            <p>Obrigado pelo contato!</p>
        </div>
        <div class='content'>
            <div class='success-box'>
                <strong>✓ Mensagem recebida com sucesso!</strong>
            </div>
            
            <p>Olá, <strong>$nome</strong>!</p>
            
            <p>Recebemos sua mensagem e entraremos em contato em breve. Abaixo está uma cópia dos dados enviados:</p>
            
            <h3>Seus dados:</h3>
            
            <div class='info-row'>
                <span class='info-label'>Nome:</span> $nome
            </div>
            
            <div class='info-row'>
                <span class='info-label'>Telefone:</span> $telefone
            </div>
            
            <div class='info-row'>
                <span class='info-label'>E-mail:</span> $email
            </div>
            
            <div class='info-row'>
                <span class='info-label'>Assunto:</span> $assunto
            </div>
            
            <div class='info-row'>
                <span class='info-label'>Mensagem:</span><br>
                " . nl2br($mensagem) . "
            </div>
            
            <p style='margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 5px;'>
                <strong>📞 Contato:</strong> (62) 3922-2167<br>
                <strong>📍 Endereço:</strong> Avenida D, nº 616, Setor Oeste, Goiânia-GO, CEP: 74140-160<br>
                <strong>⏰ Horário:</strong> Terça a Domingo, 18:00h às 22:00h
            </p>
        </div>
        <div class='footer'>
            <p>Pizzaria Paulista - Tradição e Sabor desde 2002<br>
            <a href='https://pizzariapaulista.menudino.com' style='color: #8B1F41;'>Faça seu pedido online</a></p>
        </div>
    </div>
</body>
</html>
";

// Cabeçalhos para o e-mail do cliente
$headersCliente = "MIME-Version: 1.0\r\n";
$headersCliente .= "Content-type: text/html; charset=UTF-8\r\n";
$headersCliente .= "From: Pizzaria Paulista <contato@pizzariapaulista.com.br>\r\n";
$headersCliente .= "Reply-To: contato@pizzariapaulista.com.br\r\n";

// ===================================
// ENVIAR E-MAILS
// ===================================

$envioPizzaria = mail($emailPizzaria, $assuntoPizzaria, $mensagemPizzaria, $headersPizzaria);
$envioCliente = mail($email, $assuntoCliente, $mensagemCliente, $headersCliente);

// Verificar resultado
if ($envioPizzaria && $envioCliente) {
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Mensagem enviada com sucesso! Você receberá uma confirmação no seu e-mail.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por telefone.'
    ]);
}
?>
