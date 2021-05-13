const BodyElement = document.getElementsByTagName('body')[0];
const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
let WindowList: WebsiteWindow[] = [];

class WebsiteWindow {
    private Form: HTMLDivElement;
    private FormTitleBar: HTMLDivElement;
    private FormTitle: HTMLParagraphElement;
    private FormCloseButton: HTMLButtonElement;
    private FormOpenInBrowser: HTMLButtonElement;
    private FormButtonBox: HTMLDivElement;
    private FormContent: HTMLIFrameElement;
    private Title: string;
    private DeltaX: number;
    private DeltaY: number;
    private PosX: number;
    private PosY: number;
    private IsAttached: boolean;

    constructor(url: string, title: string) {
        this.Title = title;
        this.DeltaX = 0;
        this.DeltaY = 0;
        this.PosX = 0;
        this.PosY = 0;
        this.IsAttached = false;

        this.Form = document.createElement('div');
        this.FormTitleBar = document.createElement('div');
        this.FormTitle = document.createElement('p');
        this.FormCloseButton = document.createElement('button');
        this.FormOpenInBrowser = document.createElement('button');
        this.FormButtonBox = document.createElement('div');
        this.FormContent = document.createElement('iframe');

        this.FormContent.src = url;
        this.FormTitle.innerText = title;
        this.FormCloseButton.innerText = "X";
        this.FormOpenInBrowser.innerText = "im Browser öffnen";

        this.addClasses();
        this.appendStructure();

        this.FormTitleBar.addEventListener('mousedown', (e) => { this.drag(e); e.preventDefault(); return false; });
        BodyElement.addEventListener('mouseup', (e) => { this.dragEnd(e);   });
        BodyElement.addEventListener('mousemove', (e) => { this.move(e); });
        this.FormOpenInBrowser.addEventListener('click', (e) => { this.openInBrowser(e); });
        this.FormCloseButton.addEventListener('click', (e) => { this.Form.remove(); });
    }

    private addClasses() {
        this.Form.classList.add('form');
        this.Form.classList.add('blur');
        this.FormTitleBar.classList.add('form-title-bar');
        this.FormTitle.classList.add('form-title');
        this.FormCloseButton.classList.add('form-close-button');
        this.FormOpenInBrowser.classList.add('form-open-button');
        this.FormContent.classList.add('form-content');
    }

    private appendStructure() {
        BodyElement.appendChild(this.Form);
        this.Form.appendChild(this.FormTitleBar);
        this.Form.appendChild(this.FormContent);
        this.FormTitleBar.appendChild(this.FormTitle);
        this.FormTitleBar.appendChild(this.FormButtonBox);
        this.FormButtonBox.appendChild(this.FormOpenInBrowser);
        this.FormButtonBox.appendChild(this.FormCloseButton);
    }

    private drag(e: MouseEvent) {
        this.DeltaX = e.clientX - this.PosX;
        this.DeltaY = e.clientY - this.PosY;
        this.FormContent.style.pointerEvents = "none";
        this.IsAttached = true;
    }

    private dragEnd(e: MouseEvent) {
        this.IsAttached = false;
        this.FormContent.style.pointerEvents = "unset";
    }

    private move(e: MouseEvent) {
        if (this.IsAttached) {
            this.PosX = e.clientX - this.DeltaX;
            this.PosY = e.clientY - this.DeltaY;

            this.Form.style.left = `${this.PosX}px`;
            this.Form.style.top = `${this.PosY}px`;
        }
    }

    private openInBrowser(e: MouseEvent) {
        window.location.href = this.FormContent.src;
    }
}

function loadHighResBG() {
    let bg = new Image();
    bg.onload = () => {
        document.getElementsByTagName('body')[0].style.backgroundImage = `url('${bg.src}')`;
    }
    bg.src = '../img/bg.jpg';
}

function init() {
    loadHighResBG();
    let cards = Array.from(document.getElementsByClassName('card'));
    for (const card of cards) {
        card.addEventListener('click', (e) => {
            let sender = e.target as HTMLElement;
            if (sender.tagName == "IMG") { sender = sender.parentElement!; }

            if (sender.getAttribute('link') != null) {
                if (isMobile) {
                    window.location.href = sender.getAttribute('link')!;
                } else {
                    WindowList.push(new WebsiteWindow(sender.getAttribute('link')!, sender.getAttribute('name')!));
                }
            }
        });
    }
}
init();