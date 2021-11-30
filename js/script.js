'use strict';
window.addEventListener('DOMContentLoaded', () => {

    try {
        function radioFlex() {
            const parent = document.querySelectorAll('.manually__choice');
            parent.forEach(item => {
                const radios = item.querySelectorAll('.wpcf7-radio');
                radios.forEach(radio => {
                    radio.getElementsByClassName.display = 'flex';
                });
            });
        }
        radioFlex();
    } catch (error) {

    }

    function labelMin(input) {
        const inputs = document.querySelectorAll(input);

        function elementBlur(element) {
            element.addEventListener('blur', () => {
                if (element.value.length === 0) {
                    const label = element.parentNode.querySelector('label[data-label]');
                    label.classList.remove('decrease');
                    label.classList.add('increase');
                    element.parentNode.classList.remove('manually__label-min');
                } else {
                    return;
                }
            });
        }
        function clickInput() {
            inputs.forEach(element => {
                element.parentNode.addEventListener('click', () => {
                    const label = element.parentNode.querySelector('label[data-label]');
                    label.classList.add('decrease');
                    label.classList.remove('increase');
                    element.parentNode.classList.add('manually__label-min');
                    element.focus();
                    elementBlur(element);
                });
            });
        }
        clickInput();

    }

    labelMin('input[type="text"]');


    //для кнопки добавить осаго
    try {
        function showContent(trigger) {
            const btnShowAdd = document.querySelector(trigger);
            btnShowAdd.addEventListener('click', (e) => {
                e.preventDefault();
                const blockAdd = btnShowAdd.nextElementSibling;
                blockAdd.classList.add('block_show_grid');
            });
        }
        showContent('.upload__btn-add');
        showContent('.manually__btn-add');
    } catch (error) {

    }

    //добавить водителя
    try {
        function addDriver() {
            const btnAdd = document.querySelectorAll('[data-btn-add]');
            btnAdd.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    btn.parentNode.nextElementSibling.classList.remove('block_hidden');
                    btn.parentNode.nextElementSibling.classList.add('block_show');
                    e.target.remove();

                });
            });
        }
        addDriver();
    } catch (error) {

    }

    //табы
    try {
        function showTab(triggers, content, parent) {
            const tabs = document.querySelectorAll(triggers),
                tabsContent = document.querySelectorAll(content),
                tabsParent = document.querySelector(parent);

            function hideTabContent() {
                tabsContent.forEach(item => {
                    item.classList.add('block_hidden');
                    item.classList.remove('block_show');
                });

                tabs.forEach(item => {
                    item.classList.remove('tab-btn-ative');
                });
            }

            function showTabContent(i = 0) {
                tabsContent[i].classList.add('block_show');
                tabsContent[i].classList.remove('block_hidden');
                tabs[i].classList.add('tab-btn-ative');
            }

            hideTabContent();
            showTabContent();

            tabsParent.addEventListener('click', (event) => {
                event.preventDefault();
                const target = event.target;

                if (target && target.classList.contains('tab-item')) {
                    tabs.forEach((item, i) => {
                        if (target == item) {
                            hideTabContent();
                            showTabContent(i);
                        }
                    });
                }
            });
        }

        showTab('.tab-item', '.tab-content', '.online-application__chois');
    } catch (error) {

    }



    //добавление фото
    function addFile() {
        const inputsFile = document.querySelectorAll('input[type="file"]');
        inputsFile.forEach(input => {
            input.addEventListener('change', function (e) {

                const files = e.target.files[0];
                const parentInput = input.parentNode;

                if (parentInput.childNodes.length < 6) {
                    prev(files, parentInput);
                } else {
                    return;
                }

                function prev(file, parent) {
                    const reader = new FileReader();
                    reader.addEventListener('load', function (event) {
                        const imgWrap = document.createElement('div');
                        imgWrap.classList.add('upload__img-wrap');
                        imgWrap.innerHTML = `
                                <img src="${event.target.result}">
                            `;
                        parent.appendChild(imgWrap);
                        updateSvg();
                    });
                    reader.readAsDataURL(file);
                }

                function updateSvg() {
                    const wrapSvg = parentInput.querySelector('.upload__svg-wrap');
                    wrapSvg.innerHTML = `
                    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 9L6.5 15L17.5 1.5" stroke="#FBDD37" stroke-width="2"/>
                    </svg>
                    `;
                }
            });
        });
    }
    addFile();

    //select
    function inputSelect() {
        const parentInput = document.querySelectorAll('.online-application__input');
        parentInput.forEach(item => {
            const input = item.querySelector('input');
            const listOptions = item.nextElementSibling;
            listOptions.addEventListener('click', (e) => {
                const target = e.target;
                listOptions.classList.add('block_hidden');
                const valueOption = target.innerText;
                input.value = valueOption;

            });
            item.addEventListener('click', () => {
                listOptions.classList.remove('block_hidden');
                const itemsOptions = listOptions.childNodes;
                const defaultOption = itemsOptions[1].innerText;
                input.value = defaultOption;
                document.addEventListener('click', (e) => {
                    const target = e.target;
                    if (!target.closest('.online-application__input')) {
                        listOptions.classList.add('block_hidden');
                    }
                });
            });
        });
    }

    inputSelect();

    try {
        function initMask() {

            function createMask(event) {
                let matrix = '__.__.____',
                    i = 0,
                    def = matrix.replace(/\D/g, ''),
                    val = this.value.replace(/\D/g, '');

                if (def.length >= val.length) {
                    val = def;
                }

                this.value = matrix.replace(/./g, function (a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
                });

                if (event.type === 'blur') {
                    if (this.value.length == 0) {
                        this.value = '';
                    }
                }
            }

            let inputs = document.querySelectorAll('.data-date');

            inputs.forEach(input => {
                input.addEventListener('input', createMask);
                input.addEventListener('focus', createMask);
                input.addEventListener('blur', createMask);
            });
        }

        initMask();
    } catch (error) {

    }

    function thanks(selector) {
        const form = document.querySelector(selector);
        const thanks = form.parentNode.nextElementSibling;
        console.log(thanks);
        form.addEventListener('wpcf7submit', () => {
            form.classList.remove('block_show');
            form.classList.add('block_hidden');
            thanks.classList.remove('block_hidden');
            thanks.classList.add('block_show');
        });
        const btnThanks = thanks.querySelector('button');
        btnThanks.addEventListener('click', () => {
            form.classList.add('block_show');
            form.classList.remove('block_hidden');
            thanks.classList.remove('block_show');
            thanks.classList.add('block_hidden');
        });
    }

    try {
        thanks('#wpcf7-f1245-p221-o1 form');
    } catch (error) {

    }

});
