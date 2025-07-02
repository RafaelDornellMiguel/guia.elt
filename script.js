// Módulo de Controle do Menu
// Módulo de Controle do Menu - Versão Refatorada
const MenuController = (() => {
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const logo = document.querySelector('.logo');

    const init = () => {
        menuBtn.addEventListener('click', toggleMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleOutsideClick);
        
        // Garante que o menu esteja fechado ao carregar em desktop
        if (window.innerWidth > 768) {
            closeMenu();
        }
    };

    const toggleMenu = () => {
        menuBtn.classList.toggle('open');
        nav.classList.toggle('open');
        
        // Bloqueia/libera o scroll do body quando o menu está aberto
        if (nav.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        menuBtn.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    };

    const handleResize = () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    };

    const handleOutsideClick = (e) => {
        // Fecha o menu se clicar fora, exceto no logo ou botão do menu
        if (!menuBtn.contains(e.target) && !nav.contains(e.target) && !logo.contains(e.target)) {
            closeMenu();
        }
    };

    return { init };
})();

// Módulo de Efeitos de Scroll
const ScrollEffects = (() => {
    const header = document.getElementById('header');
    const progressBar = document.getElementById('myProgressBar');

    const init = () => {
        window.addEventListener('scroll', handleScroll);
    };

    const handleScroll = () => {
        updateHeader();
        updateProgressBar();
        updateActiveNavLinks();
    };

    const updateHeader = () => {
        header.classList.toggle('header-shrink', window.scrollY > 50);
    };

    const updateProgressBar = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    };

    const updateActiveNavLinks = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
        });
    };

    return { init };
})();

// Módulo da Galeria de Fotos
const GalleryController = (() => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');

    const init = () => {
        galleryItems.forEach(item => item.addEventListener('click', openModal));
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', handleOutsideClick);
    };

    const openModal = (e) => {
        modal.classList.add('open');
        modalImg.src = e.currentTarget.querySelector('img').src;
        modalImg.alt = e.currentTarget.querySelector('img').alt;
    };

    const closeModal = () => {
        modal.classList.remove('open');
    };

    const handleOutsideClick = (e) => {
        if (e.target === modal) closeModal();
    };

    return { init };
})();

// Módulo do Player de Música
const MusicPlayer = (() => {
    let currentTrack = 0;
    let isPlaying = false;
    const audioPlayer = document.getElementById('audio-player');
    const tracks = [
        { title: "HIGHER", src: "AUD/01 - HIGHER .mp3", duration: "04:34" },
        { title: "FLY HIGHER", src: "AUD/02 - FLY HIGHER .mp3", duration: "04:15" },
        { title: "LIVING", src: "AUD/03 - LIVING .mp3", duration: "03:16" },
        { title: "START AGAIN", src: "AUD/04 - START AGAIN.mp3", duration: "04:40" },
        { title: "MIRACLE", src: "AUD/05 - MIRACLE.mp3", duration: "05:02" },
        { title: "ONE BY ONE", src: "AUD/06 - ONE BY ONE.mp3", duration: "03:09" },
        { title: "ACROSS", src: "AUD/07 - ACROSS .mp3", duration: "04:02" },
        { title: "SO TAKE", src: "AUD/08 - SO TAKE.mp3", duration: "05:50" },
        { title: "TELL ME", src: "AUD/09 - TELL ME .mp3", duration: "02:37" },
        { title: "IM BACK-1", src: "AUD/10 - IM BACK-1.mp3", duration: "04:02" },
        { title: "REAL PASSSION", src: "AUD/11 - REAL PASSSION.mp3", duration: "03:24" }
    ];

    const init = () => {
        document.querySelectorAll('.track').forEach((track, index) => {
            track.addEventListener('click', () => playTrack(index + 1));
        });

        document.querySelector('.play-btn').addEventListener('click', togglePlay);
        document.querySelector('.next-btn').addEventListener('click', nextTrack);
        document.querySelector('.prev-btn').addEventListener('click', prevTrack);
        audioPlayer.addEventListener('ended', nextTrack);
    };

    const playTrack = (trackNumber) => {
        currentTrack = trackNumber - 1;
        audioPlayer.src = tracks[currentTrack].src;
        audioPlayer.play();
        isPlaying = true;
        updatePlayerUI();
    };

    const togglePlay = () => {
        if (!audioPlayer.src) return;
        
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        isPlaying = !isPlaying;
        updatePlayerUI();
    };

    const nextTrack = () => {
        currentTrack = (currentTrack + 1) % tracks.length;
        playTrack(currentTrack + 1);
    };

    const prevTrack = () => {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        playTrack(currentTrack + 1);
    };

    const updatePlayerUI = () => {
        const playBtn = document.querySelector('.play-btn');
        playBtn.textContent = isPlaying ? '⏸' : '▶';
        
        const nowPlaying = document.querySelector('.now-playing');
        nowPlaying.textContent = `Tocando: ${tracks[currentTrack].title.replace(/^\d+\.\s/, '')}`;
        
        document.querySelectorAll('.track').forEach((track, index) => {
            track.classList.toggle('active', index === currentTrack);
        });
    };

    return { init };
})();

// Módulo de Internacionalização
const I18nController = (() => {
    const translations = {
        pt: {
            "title": "Stammers - Rock Band",
            "menu.home": "Home",
            "menu.bio": "Biografia",
            "menu.clips": "Clips",
            "menu.album": "Album",
            "menu.photos": "Fotos",
            "menu.contact": "Contato",
            "hero.title": "Bem-vindos Stammers",
            "hero.button": "Conheça a banda",
            "sections.bio": "Biografia",
            "sections.clips": "Videoclipes",
            "sections.album": "Álbuns",
            "sections.photos": "Galeria de Fotos",
            "sections.contact": "Contato",
            "bio.paragraph1": "A Stammers é a prova viva de que o rock autoral brasileiro ainda pulsa forte e tem muito a dizer. Com influências que vão do hard rock clássico aos elementos modernos do rock contemporâneo, a banda entrega um som autêntico, poderoso e cheio de personalidade.",
            "bio.paragraph2": "Formada por músicos experientes e apaixonados pela arte, a Stammers se destaca não só pela técnica apurada, mas pela energia crua e visceral que imprime em cada apresentação ao vivo. Com presença marcante e letras que misturam paixão, fé, crítica e introspecção.",
            "bio.paragraph3": "A banda lançou seu primeiro single Unbreakable, disponível em todas as plataformas digitais, e já marcou presença em diversos palcos catarinenses, conquistando o público com apresentações cheias de atitude e autenticidade. ",
            "bio.paragraph4": "Stammers não é só música — é identidade, resistência e paixão. É o grito de quem acredita que o rock ainda pode emocionar, transformar e unir.",
            "bio.paragraph5": "Gravado e produzido com peso e alma no Shokran Studios.",
            // ... outras traduções
        },
        en: {
            "title": "Stammers - Rock Band",
            "menu.home": "Home",
            "menu.bio": "Biography",
            "menu.clips": "Clips",
            "menu.album": "Album",
            "menu.photos": "Photos",
            "menu.contact": "Contact",
            "hero.title": "Welcome Stammers",
            "hero.button": "Meet the band",
            "sections.bio": "Biography",
            "sections.clips": "Music Videos",
            "sections.album": "Albums",
            "sections.photos": "Photo Gallery",
            "sections.contact": "Contact",
            "bio.paragraph1": "Stammers is living proof that Brazilian original rock is still going strong and has a lot to say. With influences ranging from classic hard rock to modern elements of contemporary rock, the band delivers an authentic, powerful and personality-filled sound.",
            "bio.paragraph2": "Formada por músicos experientes e apaixonados pela arte, a Stammers se destaca não só pela técnica apurada, mas pela energia crua e visceral que imprime em cada apresentação ao vivo. Com presença marcante e letras que misturam paixão, fé, crítica e introspecção.",
            "bio.paragraph3": "The band released their first single Unbreakable, available on all digital platforms, and has already performed on several stages in Santa Catarina, winning over the public with performances full of attitude and authenticity.",
            "bio.paragraph4": "Stammers is not just music — it is identity, resistance and passion. It is the cry of those who believe that rock can still move, transform and unite.",
            "bio.paragraph5": "Recorded and produced with weight and soul at Shokran Studios.",
            // ... outras traduções
        }
    };

    const init = () => {
        const savedLang = localStorage.getItem('preferredLang') || 'pt';
        updateTexts(savedLang);
        setupLanguageButtons();
    };

    const updateTexts = (lang) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang]?.[key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
    };

    const setupLanguageButtons = () => {
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                localStorage.setItem('preferredLang', lang);
                document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                updateTexts(lang);
            });
        });
    };

    return { init };
})();

// Módulo de Animação Fluida
const FluidAnimation = (() => {
    let animationInstance = null;

    class Animation {
        constructor() {
            this.canvas = document.getElementById('fluid-canvas');
            this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
            if (!this.gl) throw new Error('WebGL not supported');

            this.mouseX = 0;
            this.mouseY = 0;
            this.lastTime = Date.now();

            this.initWebGL();
            this.initShaders();
            this.initBuffers();
            this.setupEventListeners();
            this.resize();
            this.animate();
        }

        initWebGL() {
            this.gl.getExtension('OES_texture_float');
            this.gl.getExtension('OES_texture_float_linear');
        }

        initShaders() {
            const vertexShader = this.compileShader(`
                attribute vec2 a_position;
                varying vec2 v_texCoord;
                void main() {
                    v_texCoord = a_position * 0.5 + 0.5;
                    gl_Position = vec4(a_position, 0.0, 1.0);
                }
            `, this.gl.VERTEX_SHADER);

            const fragmentShader = this.compileShader(`
                precision mediump float;
                uniform float u_time;
                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                varying vec2 v_texCoord;
                void main() {
                    vec2 uv = v_texCoord;
                    uv.y = 1.0 - uv.y;
                    uv.x *= u_resolution.x / u_resolution.y;
                    gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(u_time), 1.0);
                }
            `, this.gl.FRAGMENT_SHADER);

            this.program = this.gl.createProgram();
            this.gl.attachShader(this.program, vertexShader);
            this.gl.attachShader(this.program, fragmentShader);
            this.gl.linkProgram(this.program);

            if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
                throw new Error('Shader program error: ' + this.gl.getProgramInfoLog(this.program));
            }

            this.gl.useProgram(this.program);
            this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
            this.timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
            this.resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
            this.mouseLocation = this.gl.getUniformLocation(this.program, 'u_mouse');
        }

        compileShader(source, type) {
            const shader = this.gl.createShader(type);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                throw new Error('Shader compilation error: ' + this.gl.getShaderInfoLog(shader));
            }

            return shader;
        }

        initBuffers() {
            this.buffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
                -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0
            ]), this.gl.STATIC_DRAW);
            this.gl.enableVertexAttribArray(this.positionLocation);
            this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        }

        setupEventListeners() {
            window.addEventListener('resize', this.resize.bind(this));
            window.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX / this.canvas.width;
                this.mouseY = 1.0 - e.clientY / this.canvas.height;
            });
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }

        animate() {
            const currentTime = Date.now();
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.uniform1f(this.timeLocation, currentTime / 1000);
            this.gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
            this.gl.uniform2f(this.mouseLocation, this.mouseX, this.mouseY);
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    const init = () => {
        try {
            animationInstance = new Animation();
        } catch (e) {
            console.error('Fluid animation failed:', e);
            document.getElementById('fluid-canvas').style.display = 'none';
            document.body.style.background = 'linear-gradient(45deg, #0a0a0a, #1a0303)';
        }
    };

    return { init };
})();

// Inicialização de todos os módulos
document.addEventListener('DOMContentLoaded', () => {
    MenuController.init();
    ScrollEffects.init();
    GalleryController.init();
    MusicPlayer.init();
    I18nController.init();
    FluidAnimation.init();

    // Configuração do WhatsApp
    const whatsappNumber = "554791652056";
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.href = `https://wa.me/${whatsappNumber}`;
    });
});