//Box 1 part 1
let adding_deck = document.querySelector('.adding-deck')
let add_deck_button = document.querySelector('.add-deck')
//Box 1 part 2
let creating_deck = document.querySelector('.creating-deck')
let Header = document.querySelector('.Header')
let card_container = document.querySelector('.card-container')
let add_new_card = document.querySelector('.add-new-card')
let back_button = document.querySelector('.Back')
let add_card_button = document.querySelector('.add-card')
let create_button = document.querySelector('.create-deck')
let term_input = document.querySelector('.term')
let definition_input = document.querySelector('.difinition')
let title_deck = document.querySelector('.title')
let enter_deck_button = document.querySelector('.enter')
let deck_exam_div = document.querySelector('.deck-exam')
let deck_container = document.querySelector('.deck-container')
let word_definition = document.querySelector('.word-difinition');
let user_term_input = document.querySelector('.user-input')
let user_enter_input = document.querySelector('.enter-user-input')

///Deck variable and functions
function create_card(card_id, card_term, card_definition){
    return {
        id: card_id,
        Term: card_term,
        Definition: card_definition
    }

}
function create_deck(deck_title, deck_id){
    return{
        id: deck_id,
        Title: deck_title,
        Cards: []
    }

}
function generate_ids(){
    return Date.now()
}
let Decks = []
///deck containers
let all_decks = document.querySelector('.all-decks')
let highlight;
let selected_deck;
add_deck_button.addEventListener('click', ()=>{
    //Box 1 part 2
    creating_deck.style.display = 'grid'
    Header.style.display = 'grid'
    card_container.style.display = 'grid'
    add_new_card.style.display = 'grid'
    
    //Box 1 part 1
    adding_deck.style.display = 'none'
    add_deck_button.style.display = 'none'
})
back_button.addEventListener('click', ()=>{
    //Box 1 part 2
    creating_deck.style.display = 'none'
    Header.style.display = 'none'
    card_container.style.display = 'none'
    add_new_card.style.display = 'none'

    //Box 1 part 1
    adding_deck.style.display = 'flex'
    add_deck_button.style.display = 'block'
})
add_card_button.addEventListener('click', ()=>{

    //create the div
    let new_card = document.createElement('div')
    new_card.classList.add('card')
    card_container.append(new_card)

    ///create the inputs
    let card_input = document.createElement('input')
    card_input.classList.add('term')
    card_input.setAttribute('placeholder', 'term')
    new_card.append(card_input)

    let card_input_2 = document.createElement('input')
    card_input_2.classList.add('difinition')
    card_input_2.setAttribute('placeholder', 'definition')
    new_card.append(card_input_2)

    //ids
    let card_id = generate_ids();
    new_card.setAttribute('id', card_id)

})
create_button.addEventListener('click', ()=>{
    ///Header variables
    let deck_title = title_deck.value;

    let deck_id = generate_ids();
    let new_deck = create_deck(deck_title, deck_id)
    
    ///creating cards list
    let all_cards = document.querySelectorAll('.card')
    all_cards.forEach((card) =>{


        let term_input = card.querySelector('.term')
        let definition_input = card.querySelector('.difinition')

        let cardId = card.getAttribute('id')

        new_deck.Cards.push(create_card(cardId, term_input.value, definition_input.value))
    })

    Decks.push(new_deck)

    title_deck.value = ''

    //Box 1 part 2
    creating_deck.style.display = 'none'
    Header.style.display = 'none'
    card_container.style.display = 'none'
    add_new_card.style.display = 'none'

    //Box 1 part 1
    adding_deck.style.display = 'flex'
    add_deck_button.style.display = 'block'

    ///remove cards in card-container
    card_container.innerHTML = ''
    
    let implement_deck = document.createElement('li')
    implement_deck.classList.add('deck')
    implement_deck.textContent = deck_title
    all_decks.append(implement_deck)

    implement_deck.addEventListener('click', ()=>{
        if(highlight){
            highlight.classList.remove('highlight')
        }
        implement_deck.classList.add('highlight')

        highlight = implement_deck

        selected_deck = Decks.find((deck) => deck.id === deck_id)
        console.log(selected_deck)

        let current_card_index = 0;
        let score = 0
        function show_next_card(){
            if(current_card_index < selected_deck.Cards.length){
                deck_container.style.display = 'none'
                deck_exam_div.style.display = 'grid'
                let current_card = selected_deck.Cards[current_card_index];

                word_definition.textContent = current_card.Definition

                user_enter_input.addEventListener('click',()=>{
                    if(user_term_input.value === current_card.Term){
                        user_term_input.value = ''
                        score++;
                        console.log(score)
                        current_card_index++;
                        show_next_card()
                    }
                    if (current_card_index === selected_deck.Cards.length){
                        console.log('you won')
                        deck_container.style.display = 'grid'
                        deck_exam_div.style.display = 'none'
                        score = 0
                        }
                    })
            }
        }
        enter_deck_button.addEventListener('click', ()=>{
            if(selected_deck){
                show_next_card()
            }
            console.log('clicked')
        })
        
    })

})
