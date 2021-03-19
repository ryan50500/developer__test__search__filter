$(document).ready(function(){

    const menswear = document.getElementById('menswear');
    
    async function fetchData() {
        const response = await fetch('data.JSON');
        const data = await response.json();
        const menswearData = data.listing.products;
    
        menswearData.forEach(element => {
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
    
                       menswear.appendChild(product);
    
                       $(product).on('mouseover', function(e) {
                           console.log($(this));
                        $(this).find('img').attr("src",`${element.images.model}`).addClass('scaled');
                          });
                          
                          $(product).on('mouseleave', function(e) {
                            console.log($(this));
                         $(this).find('img').attr("src",`${element.images.cutOut}`).removeClass('scaled');
                           });

                     });

                }
            fetchData();
        });
    
    
    
      
     