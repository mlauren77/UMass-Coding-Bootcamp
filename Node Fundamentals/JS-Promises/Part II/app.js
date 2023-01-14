//** Part I: make a request to the Deck of Cards API to request a single card from a newly shuffled deck: */
let url = 'https://deckofcardsapi.com/';
// $.getJSON(`${url}/api/deck/new/draw/?count=1`).then((data) => {
// 	let { suit, value } = data.cards[0];
// 	console.log(`${value} of ${suit}`);
// });

//** Part II: Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request
//  to the same API to get one more card from the same deck: */
// let url = 'https://deckofcardsapi.com/';
axios
	.get(`${url}/api/deck/new/shuffle/?deck_count=1`)
	.then((p1) => {
		let deck_id = p1.data.deck_id;
		console.log(deck_id);
		return axios.get(`${url}/api/deck/${deck_id}/draw/?count=1`);
	})
	.then((p2) => {
		console.log(`${p2.data.cards[0].value} of ${p2.data.cards[0].suit}`);
		return axios.get(`${url}/api/deck/new/draw/?count=1`);
	})
	.then((p3) => {
		console.log(`${p3.data.cards[0].value} of ${p3.data.cards[0].suit}`);
	});

//** Part III: Build an HTML page that lets you draw cards from a deck.
//  When the page loads, go to the Deck of Cards API to create a new deck, and show a button
//  on the page that will let you draw a card. Every time you click the button,
//  display a new card, until there are no cards left in the deck. */
// let url = 'https://deckofcardsapi.com/';
