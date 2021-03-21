$(document).ready(function() {

	// container where products are displayed
	const menswear = document.getElementById('menswear');
	// search filter for brands
	const searchStates = async searchText => {
		console.log(searchText)
		const response = await fetch('data.JSON');
		const states = await response.json();
		const products = states.listing.products;
		// get matches to current user search input
		let matches = Object.values(products).filter(state => {
			const regex = new RegExp(`^${searchText}`, 'gi');
			return state.brand.name.match(regex);
        });
        
		// show results in HTML
		matches.forEach(element => {
			// console.log(element);
			const product = document.createElement('div');
			product.className = 'flex';
			product.innerHTML = `
        
                <div class="flex">
                    <h2>${element.brand.name}</h2>
                    <img class="transition" src="${element.images.cutOut}"
                    alt="${element.brand.name}">
                    <p>${element.shortDescription}</p>
                    <p>${element.priceInfo.formattedFinalPrice}</p>
                </div>
                       `;

			//    prepend each match inside container
            menswear.prepend(product);
            
            // show second image on hover
			const currentImage = product.querySelector('img');
			$(currentImage).on('mouseover', function(e) {
				console.log($(this));
				$(this).attr("src", `${element.images.model}`).addClass('scaled');
			});
			$(currentImage).on('mouseleave', function(e) {
				console.log($(this));
				$(this).attr("src", `${element.images.cutOut}`).removeClass('scaled');
			});
		});
    };
    
	//    search filter for brands
	const filterInput = document.getElementById('filter');
    filterInput.addEventListener('input', () => searchStates(filterInput.value));
    




	// displayed results on page load
	async function fetchData() {
		const response = await fetch('data.JSON');
		const states = await response.json();
		const products = states.listing.products;
		products.forEach(element => {
			console.log(element);
			const product = document.createElement('div');
			product.className = 'flex';
			product.innerHTML = `
        
                <div class="flex">
                    <h2>${element.brand.name}</h2>
                    <img class="transition" src="${element.images.cutOut}"
                    alt="${element.brand.name}">
                    <p>${element.shortDescription}</p>
                </div>
                       `;

                // prepend each project to container
            menswear.prepend(product);
            
               // show second image on hover
			const currentImage = product.querySelector('img');
			$(currentImage).on('mouseover', function(e) {
				console.log($(this));
				$(this).attr("src", `${element.images.model}`).addClass('scaled');
            });
            
			$(currentImage).on('mouseleave', function(e) {
				console.log($(this));
				$(this).attr("src", `${element.images.cutOut}`).removeClass('scaled');
			});
		});
	}
	fetchData();
});


// $(window).on('load', function() {
//     setTimeout(function(){
//   // focus on search input
//   $("input[name='userSearch']").focus(); 
//   console.log('focusd');
// }, 2000);
// });
