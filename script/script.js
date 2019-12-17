document.addEventListener('DOMContentLoaded', () => {
    'use strict';
   
    const client = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const clientBlock = document.querySelector('#block-customer');
    const freelancerBlock = document.querySelector('#block-freelancer');
    const choiceBlock = document.querySelector('#block-choice');
    const btnExit = document.querySelector('#btn-exit');
    const formCustomer = document.querySelector('#form-customer');

    const orders = [];
    
    client.addEventListener('click', () => {
        choiceBlock.style.display = 'none';
        clientBlock.style.display = 'block';
        btnExit.style.display = 'block';
    });
    freelancer.addEventListener('click', () => {
        choiceBlock.style.display = 'none';
        freelancerBlock.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', ()=> {
        btnExit.style.display = 'none';
        freelancerBlock.style.display = 'none'; 
        clientBlock.style.display = 'none'; 
        choiceBlock.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const elementsObj = {};
        for (const elem of formCustomer.elements) {
            if ((elem.tagName === 'INPUT' || 'TEXTAREA')     && elem.type !== "radio" ||
            elem.type === "radio" && elem.checked) {
                elementsObj[elem.name] = elem.value;
            }
        }
        orders.push(elementsObj);
    });

});