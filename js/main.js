// ===================================
// PIZZARIA PAULISTA - MAIN.JS
// ===================================

// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {

    // Debug/diagnóstico: indica que o main.js carregou e executou
    window.__ppMainJsLoaded = true;

    // ===================================
    // MODAL - MUDANÇA DE ENDEREÇO / DELIVERY
    // ===================================
    (function initMudancaEnderecoModal() {
        function ensureMudancaModalStyles() {
            // Se o CSS do modal não estiver publicado/carregado, o conteúdo pode
            // acabar “perdido” no fim da página. Este fallback injeta estilos mínimos.
            if (document.getElementById('pp-modal-style')) return;

            // Detectar se existe regra aplicada (position: fixed) para .pp-modal-overlay
            const test = document.createElement('div');
            test.className = 'pp-modal-overlay';
            document.body.appendChild(test);
            const position = window.getComputedStyle(test).position;
            document.body.removeChild(test);

            if (position === 'fixed') return;

            const style = document.createElement('style');
            style.id = 'pp-modal-style';
            style.textContent = `
                body.pp-modal-lock{overflow:hidden;}
                .pp-modal-overlay{position:fixed;inset:0;z-index:20000;display:flex;align-items:center;justify-content:center;padding:16px;padding-top:max(16px, env(safe-area-inset-top));padding-bottom:max(16px, env(safe-area-inset-bottom));background:rgba(0,0,0,.72);opacity:0;pointer-events:none;transition:opacity .2s ease;overflow-y:auto;-webkit-overflow-scrolling:touch;}
                .pp-modal-overlay.pp-modal-overlay--open{opacity:1;pointer-events:auto;}
                .pp-modal{position:relative;width:min(560px,100%);max-height:calc(100vh - 24px);max-height:calc(100dvh - 24px);overflow:auto;background:#fff;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.35);}
                .pp-modal-close{position:absolute;top:6px;right:6px;width:36px;height:36px;border-radius:999px;border:none;background:#8B1F41;color:#fff;font-size:24px;line-height:1;cursor:pointer;}
                .pp-modal-header{padding:16px 48px 10px 16px;background:linear-gradient(135deg,rgba(139,31,65,.08),rgba(27,94,32,.08));}
                .pp-modal-title{margin:0 0 4px;font-size:1.25rem;line-height:1.2;}
                .pp-modal-subtitle{margin:0;color:#333;font-size:.9rem;}
                .pp-modal-highlight{background:rgba(139,31,65,.06);border-left:4px solid #8B1F41;padding:10px 12px;margin:8px 12px;border-radius:6px;}
                .pp-modal-highlight-text{margin:0;color:#333;font-size:.9rem;line-height:1.35;}
                .pp-modal-channels-title{margin:10px 12px 6px;font-size:.9rem;}
                .pp-modal-channels{list-style:none;margin:0;padding:0 12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;}
                .pp-modal-channel{display:flex;flex-direction:column;justify-content:center;gap:2px;min-width:0;padding:7px 9px;border:1px solid #eee;border-radius:7px;background:#fafafa;}
                .pp-modal-channel-label{font-size:.7rem;color:#555;font-weight:600;}
                .pp-modal-channel-link{color:#8B1F41;font-size:.8rem;font-weight:800;text-decoration:none;overflow-wrap:anywhere;}
                .pp-modal-actions{padding:10px 12px 12px;}
                .pp-modal-ack{width:100%;border:none;border-radius:7px;padding:10px 12px;background:#8B1F41;color:#fff;font-size:.9rem;font-weight:800;cursor:pointer;}
                @media (max-height:600px){.pp-modal-header{padding-top:10px;padding-bottom:6px}.pp-modal-highlight{padding:7px 10px;margin-top:6px;margin-bottom:6px}.pp-modal-channels-title{margin-top:6px}.pp-modal-channel{padding:5px 7px}.pp-modal-actions{padding-top:7px;padding-bottom:8px}}
                @media (max-height:400px){.pp-modal-header{padding-top:8px;padding-bottom:4px}.pp-modal-title{font-size:1.1rem}.pp-modal-subtitle{font-size:.78rem;line-height:1.2}.pp-modal-highlight{padding:5px 8px;margin:5px 10px}.pp-modal-highlight-text{font-size:.78rem;line-height:1.2}.pp-modal-channels-title{font-size:.8rem;margin:5px 10px 3px}.pp-modal-channels{grid-template-columns:repeat(3,minmax(0,1fr));padding:0 10px;gap:4px}.pp-modal-channel{flex-direction:row;align-items:baseline;flex-wrap:wrap;gap:0 4px;padding:4px 6px}.pp-modal-channel-label{font-size:.6rem}.pp-modal-channel-link{font-size:.68rem}.pp-modal-actions{padding:5px 10px 6px}.pp-modal-ack{padding:6px 8px;font-size:.8rem}.pp-modal-close{width:32px;height:32px}}
            `;
            document.head.appendChild(style);
        }

        ensureMudancaModalStyles();

        const overlay = document.createElement('div');
        overlay.className = 'pp-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Novo endereço e pausa temporária no atendimento');

        overlay.innerHTML = `
            <div class="pp-modal" role="document">
                <button type="button" class="pp-modal-close" aria-label="Fechar aviso">×</button>

                <div class="pp-modal-header">
                    <h2 class="pp-modal-title">Novo Endereço</h2>
                    <p class="pp-modal-subtitle">Agora estamos em <strong>Avenida D, nº 616</strong> — Setor Oeste, Goiânia-GO <strong>(CEP 74140-160)</strong>.</p>
                </div>

                <div class="pp-modal-highlight">
                    <p class="pp-modal-highlight-text">Estamos com a produção e atendimento pausados temporariamente, sem data de retorno definida.</p>
                </div>

                <h3 class="pp-modal-channels-title">Canais de atendimento e redes sociais</h3>
                <ul class="pp-modal-channels" aria-label="Canais de atendimento e redes sociais">
                    <li class="pp-modal-channel">
                        <span class="pp-modal-channel-label">Telefone</span>
                        <a class="pp-modal-channel-link" href="tel:+556239222167">(62) 3922-2167</a>
                    </li>
                    <li class="pp-modal-channel">
                        <span class="pp-modal-channel-label">WhatsApp</span>
                        <a class="pp-modal-channel-link" href="https://wa.me/556239222167" target="_blank" rel="noopener">(62) 3922-2167</a>
                    </li>
                    <li class="pp-modal-channel">
                        <span class="pp-modal-channel-label">Site de pedidos</span>
                        <a class="pp-modal-channel-link" href="https://pizzariapaulista.menudino.com" target="_blank" rel="noopener">Acessar site</a>
                    </li>
                    <li class="pp-modal-channel">
                        <span class="pp-modal-channel-label">iFood</span>
                        <a class="pp-modal-channel-link" href="https://www.ifood.com.br/delivery/goiania-go/pizzaria-paulista---goiania-setor-oeste/72eef194-5e44-4bed-9905-84fd86c788e8" target="_blank" rel="noopener">Abrir no iFood</a>
                    </li>
                    <li class="pp-modal-channel">
                        <span class="pp-modal-channel-label">Facebook</span>
                        <a class="pp-modal-channel-link" href="https://facebook.com/pizzariapaulista" target="_blank" rel="noopener">Acessar página</a>
                    </li>
                    <li class="pp-modal-channel">
                        <span class="pp-modal-channel-label">Instagram</span>
                        <a class="pp-modal-channel-link" href="https://instagram.com/pizzariapaulista" target="_blank" rel="noopener">@pizzariapaulista</a>
                    </li>
                </ul>

                <div class="pp-modal-actions">
                    <button type="button" class="pp-modal-ack">Fechar aviso</button>
                </div>
            </div>
        `;

        const closeBtn = overlay.querySelector('.pp-modal-close');
        const ackBtn = overlay.querySelector('.pp-modal-ack');

        function closeModal() {
            document.body.classList.remove('pp-modal-lock');
            overlay.classList.remove('pp-modal-overlay--open');

            // Remove do DOM após animação
            window.setTimeout(() => {
                if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 200);
        }

        closeBtn.addEventListener('click', closeModal);
        ackBtn.addEventListener('click', closeModal);

        // Fechar com ESC
        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Inserir e abrir
        document.body.appendChild(overlay);
        document.body.classList.add('pp-modal-lock');
        // Pequeno delay para permitir transição CSS
        window.setTimeout(() => {
            overlay.classList.add('pp-modal-overlay--open');
            ackBtn.focus();
        }, 0);
    })();
    
    // ===================================
    // MENU MOBILE TOGGLE
    // ===================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do ícone hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Fechar menu ao clicar em um link (mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // ===================================
    // DESTACAR PÁGINA ATIVA NO MENU
    // ===================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ===================================
    // ACCORDION - PÁGINA SOBRE
    // ===================================
    const accordionButtons = document.querySelectorAll('.accordion-button');
    const accordionContents = document.querySelectorAll('.accordion-content');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const isActive = this.classList.contains('active');
            
            // Fechar todos os accordions com animação de recolher
            accordionButtons.forEach(btn => btn.classList.remove('active'));
            accordionContents.forEach(content => {
                if (content.classList.contains('active')) {
                    // define altura atual para animar o fechamento
                    content.style.maxHeight = content.scrollHeight + 'px';
                    // força reflow para aplicar o valor antes de reduzir
                    void content.offsetHeight;
                    content.style.maxHeight = '0';
                }
                content.classList.remove('active');
                content.style.paddingTop = null;
                content.style.paddingBottom = null;
            });
            
            // Se não estava ativo, ativar o clicado
            if (!isActive) {
                this.classList.add('active');
                targetContent.classList.add('active');
                // Expandir suavemente: altura baseada no conteúdo real
                targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
                // Após a transição, liberar para altura automática (evita corte de conteúdo dinâmico)
                const onTransitionEnd = () => {
                    if (targetContent.classList.contains('active')) {
                        targetContent.style.maxHeight = 'none';
                    }
                    targetContent.removeEventListener('transitionend', onTransitionEnd);
                };
                targetContent.addEventListener('transitionend', onTransitionEnd);
                // Garantir padding visível em inline style durante a transição
                targetContent.style.paddingTop = '15px';
                targetContent.style.paddingBottom = '15px';
            }
        });
    });

    // Ajustar altura inicial dos accordions já ativos no load (ex.: primeira seção aberta)
    accordionContents.forEach(content => {
        if (content.classList.contains('active')) {
            content.style.maxHeight = 'none';
            content.style.paddingTop = '15px';
            content.style.paddingBottom = '15px';
        }
    });
    
    // ===================================
    // SCROLL SUAVE
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#top') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // ANIMAÇÃO DE FADE IN AO SCROLLAR
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos com a classe 'animate-on-scroll'
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===================================
    // BOTÃO VOLTAR AO TOPO
    // ===================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopBtn);
    
    // Estilizar botão via JS para manter CSS limpo
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--cor-primaria, #8B1F41);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = '#a62953';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#8B1F41';
    });
    
    // ===================================
    // HORÁRIO DE FUNCIONAMENTO DINÂMICO
    // ===================================
    function atualizarHorarioFuncionamento() {
        const horarioTexto = document.querySelector('.horario-texto');
        if (!horarioTexto) return;
        
        const agora = new Date();
        const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, etc.
        const horaAtual = agora.getHours();
        const minutoAtual = agora.getMinutes();
        
        let status = '';
        let proximoHorario = '';
        
        // Segunda-feira = 1 (Fechado)
        if (diaSemana === 1) {
            status = '<span style="color: #ff5252;">● Fechado</span>';
            proximoHorario = 'Abre terça-feira às 18:00h';
        } 
        // Terça a Domingo (18:00h às 22:00h)
        else {
            const horaEmMinutos = horaAtual * 60 + minutoAtual;
            const abertura = 18 * 60; // 18:00
            const fechamento = 22 * 60; // 22:00
            
            if (horaEmMinutos >= abertura && horaEmMinutos <= fechamento) {
                status = '<span style="color: #4caf50;">● Aberto agora</span>';
                proximoHorario = 'Fecha às 22:00h';
            } else {
                status = '<span style="color: #ff5252;">● Fechado</span>';
                if (horaEmMinutos < abertura) {
                    proximoHorario = 'Abre hoje às 18:00h';
                } else {
                    // Após o fechamento (22:00)
                    // De terça a sábado: abre amanhã às 18h
                    // Domingo: próxima abertura é terça às 18h (segunda é fechada)
                    proximoHorario = (diaSemana === 0) ? 'Abre terça-feira às 18:00h' : 'Abre amanhã às 18:00h';
                }
            }
        }
        
        horarioTexto.innerHTML = `
            <div>${status}</div>
            <small>${proximoHorario}</small>
        `;
    }
    
    // Atualizar horário ao carregar e a cada minuto
    atualizarHorarioFuncionamento();
    setInterval(atualizarHorarioFuncionamento, 60000);
    
    // ===================================
    // FORMULÁRIO DE CONTATO
    // ===================================
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        // Máscara para telefone
        const telefoneInput = document.getElementById('telefone');
        const emailInput = document.getElementById('email');
        const nomeInput = document.getElementById('nome');
        const mensagemInput = document.getElementById('mensagem');
        
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                    if (value.length <= 10) {
                        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
                    } else {
                        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
                    }
                    e.target.value = value;
                }
                
                // Validação visual
                const telefoneNumeros = value.replace(/\D/g, '');
                if (telefoneNumeros.length === 10 || telefoneNumeros.length === 11) {
                    e.target.classList.remove('error');
                    e.target.classList.add('valid');
                } else if (telefoneNumeros.length > 0) {
                    e.target.classList.remove('valid');
                    e.target.classList.add('error');
                } else {
                    e.target.classList.remove('valid', 'error');
                }
            });
        }
        
        // Validação de email em tempo real
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value.trim()) {
                    if (emailRegex.test(this.value.trim())) {
                        this.classList.remove('error');
                        this.classList.add('valid');
                    } else {
                        this.classList.remove('valid');
                        this.classList.add('error');
                    }
                } else {
                    this.classList.remove('valid', 'error');
                }
            });
        }
        
        // Validação de nome
        if (nomeInput) {
            nomeInput.addEventListener('blur', function() {
                if (this.value.trim().length >= 3) {
                    this.classList.remove('error');
                    this.classList.add('valid');
                } else if (this.value.trim().length > 0) {
                    this.classList.remove('valid');
                    this.classList.add('error');
                } else {
                    this.classList.remove('valid', 'error');
                }
            });
        }
        
        // Validação de mensagem
        if (mensagemInput) {
            mensagemInput.addEventListener('blur', function() {
                if (this.value.trim().length >= 10) {
                    this.classList.remove('error');
                    this.classList.add('valid');
                } else if (this.value.trim().length > 0) {
                    this.classList.remove('valid');
                    this.classList.add('error');
                } else {
                    this.classList.remove('valid', 'error');
                }
            });
        }
        
        formContato.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Elementos do formulário
            const btnEnviar = formContato.querySelector('.btn-enviar');
            const btnText = btnEnviar.querySelector('.btn-text');
            const btnLoading = btnEnviar.querySelector('.btn-loading');
            const formMensagem = document.getElementById('form-mensagem');
            
            // Validação dos campos
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !telefone || !email || !assunto || !mensagem) {
                mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }
            
            // Validar nome (mínimo 3 caracteres)
            if (nome.length < 3) {
                mostrarMensagem('Por favor, insira um nome válido (mínimo 3 caracteres).', 'erro');
                document.getElementById('nome').focus();
                return;
            }
            
            // Validar telefone
            const telefoneNumeros = telefone.replace(/\D/g, '');
            if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
                mostrarMensagem('Por favor, insira um telefone válido (DDD + número).', 'erro');
                document.getElementById('telefone').focus();
                return;
            }
            
            // Validar e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarMensagem('Por favor, insira um e-mail válido.', 'erro');
                document.getElementById('email').focus();
                return;
            }
            
            // Validar mensagem (mínimo 10 caracteres)
            if (mensagem.length < 10) {
                mostrarMensagem('Por favor, insira uma mensagem mais detalhada (mínimo 10 caracteres).', 'erro');
                document.getElementById('mensagem').focus();
                return;
            }
            
            // Desabilitar botão e mostrar loading
            btnEnviar.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            formMensagem.style.display = 'none';
            
            // Preparar dados
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('telefone', telefone);
            formData.append('email', email);
            formData.append('assunto', assunto);
            formData.append('mensagem', mensagem);
            
            try {
                // Enviar dados
                const response = await fetch('enviar-email.php', {
                    method: 'POST',
                    body: formData
                });
                
                // Tentar interpretar como JSON; se falhar, usar texto bruto
                let result;
                const contentType = response.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    result = await response.json();
                } else {
                    const text = await response.text();
                    result = { success: response.ok, message: text || 'Erro desconhecido ao enviar.' };
                }
                
                if (response.ok && result.success) {
                    mostrarMensagem(result.message || 'Mensagem enviada com sucesso!', 'sucesso');
                    formContato.reset();
                    
                    // Scroll suave para a mensagem
                    setTimeout(() => {
                        formMensagem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                } else {
                    const msg = result.message || 'Erro ao enviar mensagem. Por favor, tente novamente.';
                    mostrarMensagem(msg, 'erro');
                }
            } catch (error) {
                console.error('Erro:', error);
                mostrarMensagem('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por telefone: (62) 3922-2167', 'erro');
            } finally {
                // Reabilitar botão
                btnEnviar.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });
        
        function mostrarMensagem(texto, tipo) {
            const formMensagem = document.getElementById('form-mensagem');
            formMensagem.textContent = texto;
            formMensagem.className = 'form-mensagem ' + tipo;
            formMensagem.style.display = 'block';
            
            // Auto-ocultar mensagem de sucesso após 10 segundos
            if (tipo === 'sucesso') {
                setTimeout(() => {
                    formMensagem.style.display = 'none';
                }, 10000);
            }
        }
    }
    
    // ===================================
    // LAZY LOADING DE IMAGENS
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // CONSOLE LOG DE BOAS-VINDAS
    // ===================================
    console.log('%c🍕 Pizzaria Paulista', 'font-size: 24px; font-weight: bold; color: #8B1F41;');
    console.log('%cSite desenvolvido com ❤️', 'font-size: 14px; color: #1B5E20;');
    
    // ===================================
    // EXIT INTENT POPUP
    // ===================================
    
    // Verifica se é desktop (largura > 768px)
    function isDesktop() {
        return window.innerWidth > 768;
    }
    
    // Verifica se o popup já foi mostrado nos últimos 3 dias
    function shouldShowPopup() {
        if (!isDesktop()) {
            return false; // Não mostrar em mobile
        }

        let lastShown;
        try {
            lastShown = localStorage.getItem('exitPopupLastShown');
        } catch (_) {
            return true;
        }

        if (!lastShown) return true;

        const daysSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
        return daysSinceLastShown >= 3;
    }
    
    // Salvar que o popup foi mostrado
    function markPopupAsShown() {
        try {
            localStorage.setItem('exitPopupLastShown', Date.now().toString());
        } catch (_) {
            // ignore
        }
    }
    
    // Mostrar o popup
    function showExitPopup() {
        const popup = document.getElementById('exitPopup');
        if (popup) {
            popup.classList.add('show');
            document.body.style.overflow = 'hidden'; // Impedir scroll
        }
    }
    
    // Fechar o popup
    function closeExitPopup() {
        const popup = document.getElementById('exitPopup');
        if (popup) {
            popup.classList.remove('show');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    }
    
    // Detectar exit intent (mouse saindo da janela)
    let exitIntentTriggered = false;
    
    document.addEventListener('mouseleave', function(e) {
        // Verifica se o mouse está saindo pela parte superior da página
        if (e.clientY <= 0 && !exitIntentTriggered && shouldShowPopup()) {
            exitIntentTriggered = true;
            showExitPopup();
            markPopupAsShown();
        }
    });
    
    // Event listeners para fechar o popup
    const closeBtn = document.querySelector('.exit-popup-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeExitPopup();
        });
    }
    
    // Fechar ao clicar fora do conteúdo
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closeExitPopup();
            }
        });
    }
    
    // Fechar ao clicar no botão do WhatsApp (usuário está convertendo)
    const exitPopupBtn = document.getElementById('exitPopupBtn');
    if (exitPopupBtn) {
        exitPopupBtn.addEventListener('click', function() {
            // Delay para permitir que o link abra antes de fechar
            setTimeout(() => {
                closeExitPopup();
            }, 500);
        });
    }
    
    // Fechar com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeExitPopup();
        }
    });
    
});
