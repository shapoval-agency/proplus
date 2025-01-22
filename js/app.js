jQuery(document).ready(function ($) {
	testWebPFunction();
	initMobileMenu();
	initAccordion();
	initReadMore();
	initSwiper();
	initClickCard();
	initAttentionModal();
	initScrollTo();
	initSelectDropDown();
});

function testWebPFunction() {
	//Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	})
}

function initMobileMenu() {
	const headerBurger = $('.header__burger');
	const headerMenu = $('.header__menu');
	const body = $('body');
	const headerMenuLink = $('.header__link');
	const headerBtnConsultation = $('.header .btn-full');
	const headerOverlay = $('.overlay');


	headerBurger.on('click', function () {
		headerBurger.toggleClass('active');
		headerMenu.toggleClass('active');
		body.toggleClass('lock');
	});

	headerOverlay.on('click', function () {
		if (body.hasClass('lock') && headerMenu.hasClass('active') && headerBurger.hasClass('active')) {
			body.removeClass('lock');
			headerMenu.removeClass('active');
			headerBurger.removeClass('active');
		}
	});

	headerMenuLink.on('click', function () {
		if (body.hasClass('lock') && headerMenu.hasClass('active') && headerBurger.hasClass('active')) {
			body.removeClass('lock');
			headerMenu.removeClass('active');
			headerBurger.removeClass('active');
		}
	});

}

function initSwiper() {
	let swiperBenefits = new Swiper('.benefits-slider', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 'auto',
				spaceBetween: 24,
				loop: false,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 24,
				loop: false,
			}
		}
	});

	let swiperReviews = new Swiper('.reviews-slider', {
		slidesPerView: 'auto',
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		breakpoints: {
			320: {
				spaceBetween: 24,
				loop: false,
			},
			1200: {
				spaceBetween: 24,
				loop: false,
			}
		}
	});

	swiperBenefits.on('slideChange', function () {
		// Закрыть открытые отзывы
		closeOpenReviews();
	});

	swiperReviews.on('slideChange', function () {
		// Закрыть открытые отзывы
		closeOpenReviews();
	});
}


// function initReadMore() {
// 	const more = $(".read-more");


// 	if (more) {
// 		more.each(function () {
// 			var currentMoreBtn = $(this);
// 			var contentHolder = currentMoreBtn.closest(".benefits-slide__inner, .reviews-slide__inner");
// 			var content = contentHolder.find(".content-inner");
// 			var contentFull = contentHolder.find(".content-full");
// 			var minHeight = 111; // Минимальная высота, при которой read-more должен быть скрыт
// 			var minHeightBenefits = 126;

// 			currentMoreBtn.click(function (e) {
// 				var open = currentMoreBtn.hasClass('show');

// 				if (open) {
// 					content.removeAttr("style");
// 					currentMoreBtn.removeClass('show');
// 				} else {
// 					content.css("max-height", contentFull.height());
// 					currentMoreBtn.addClass('show');
// 				}
// 			});

// 			// Проверка высоты .content-full после загрузки контента
// 			contentFull.on("load", function () {
// 				if (contentFull.height() < minHeight || contentFull.height() < minHeightBenefits) {
// 					currentMoreBtn.hide();
// 				} else {
// 					currentMoreBtn.show();
// 				}
// 			});

// 			// Проверка высоты .content-full при загрузке страницы
// 			if (contentFull.height() < minHeight || contentFull.height() < minHeightBenefits) {
// 				currentMoreBtn.hide();
// 			} else {
// 				currentMoreBtn.show();
// 			}
// 		});
// 	}
// }

function initReadMore() {
	const more = $(".read-more");

	if (more) {
		more.each(function () {
			var currentMoreBtn = $(this);
			var contentHolder = currentMoreBtn.closest(".benefits-slide__inner, .reviews-slide__inner");
			var content = contentHolder.find(".content-inner");
			var contentFull = contentHolder.find(".content-full");
			var minHeight = 111; // Минимальная высота, при которой read-more должен быть скрыт
			var minHeightBenefits = 126;

			currentMoreBtn.click(function (e) {
				var open = currentMoreBtn.hasClass('show');

				// Закрытие предыдущего отзыва
				$(".read-more.show").not(currentMoreBtn).each(function () {
					var prevMoreBtn = $(this);
					var prevContentHolder = prevMoreBtn.closest(".benefits-slide__inner, .reviews-slide__inner");
					var prevContent = prevContentHolder.find(".content-inner");

					prevContent.removeAttr("style");
					prevMoreBtn.removeClass('show');
				});

				if (open) {
					content.removeAttr("style");
					currentMoreBtn.removeClass('show');
				} else {
					content.css("max-height", contentFull.height());
					currentMoreBtn.addClass('show');
				}
			});

			// Проверка высоты .content-full после загрузки контента
			contentFull.on("load", function () {
				if (contentFull.height() < minHeight || contentFull.height() < minHeightBenefits) {
					currentMoreBtn.hide();
				} else {
					currentMoreBtn.show();
				}
			});

			// Проверка высоты .content-full при загрузке страницы
			if (contentFull.height() < minHeight || contentFull.height() < minHeightBenefits) {
				currentMoreBtn.hide();
			} else {
				currentMoreBtn.show();
			}
		});
	}
}




function closeOpenReviews() {
	const openReviews = $(".read-more.show");
	openReviews.each(function () {
		var currentMoreBtn = $(this);
		var contentHolder = currentMoreBtn.closest(".benefits-slide__inner, .reviews-slide__inner");
		var content = contentHolder.find(".content-inner");

		content.removeAttr("style");
		currentMoreBtn.removeClass('show');
	});
}

function initAccordion() {
	let acc = document.getElementsByClassName("accordion__btn");
	let i;


	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			let isActive = this.classList.contains("active");

			for (let j = 0; j < acc.length; j++) {
				acc[j].classList.remove("active");
				let panel = acc[j].nextElementSibling;
				panel.style.maxHeight = null;
			}

			if (!isActive) {
				this.classList.add("active");
				let panel = this.nextElementSibling;
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}
}

// function initClickCard() {
// 	var cards = $('.advantages-card');

// 	cards.each(function () {
// 		var card = $(this);
// 		card.click(function () {
// 			if (card.hasClass('active')) {
// 				card.removeClass('active');
// 			} else {
// 				card.addClass('active');
// 			}
// 		});
// 	});
// }

function initClickCard() {
	var cards = $('.advantages-card');
	var activeCard = null;

	cards.each(function () {
		var card = $(this);
		card.click(function () {
			if (activeCard && activeCard !== card) {
				activeCard.removeClass('active');
			}
			card.toggleClass('active');
			activeCard = card.hasClass('active') ? card : null;
		});
	});
}

function initAttentionModal() {
	var cookieBlock = $('.attention-modal');
	var cookieBtnAccept = $('.attention-modal__close');

	var isCookieAccepted = sessionStorage.getItem('cookieAccepted');
	if (!isCookieAccepted) {
		cookieBlock.removeClass('hidden');
	}

	cookieBtnAccept.on('click', function (e) {
		e.preventDefault();
		cookieBlock.hide();

		sessionStorage.setItem('cookieAccepted', true);
	});
}


var dropdown = $(".dropdown");
var dropdownBtn = $(".dropdown__svg-holder");

dropdownBtn.on("click", function () {
	dropdown.toggleClass("show");
})



function openTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	var tabsToShow = document.getElementsByClassName(tabName);
	for (i = 0; i < tabsToShow.length; i++) {
		tabsToShow[i].style.display = "block";
	}
	evt.currentTarget.className += " active";
}

// document.getElementsByClassName("tablinks")[0].click();

var tablinks = document.getElementsByClassName("tablinks");
if (tablinks.length > 0) {
	tablinks[0].click();
}



function initScrollTo() {
	$("a.scroll-to").click(function () {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		}, {
			duration: 700,
			easing: "swing"
		});
		return false;
	});

}

Fancybox.bind("[data-fancybox]", {
	autoFocus: false,
	touch: false,
});


function initSelectDropDown() {
	$('.select-dropdown__button').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.select-dropdown__list').toggleClass('active');
	});
	$('.select-dropdown__list-item').on('click', function () {
		let itemValue = $(this).data('value');
		$('.select-dropdown__button span').text($(this).text()).parent().attr('data-value', itemValue);
		$('.selectCall').val(itemValue);
		$('.select-dropdown__list').toggleClass('active');
		$('.select-dropdown__button').toggleClass('active');
	});
}

let mybutton = document.getElementById("btn-up");
if (mybutton) {
	window.onscroll = function () {
		scrollFunction();
	};

	function scrollFunction() {
		if (document.body.scrollTop > document.body.scrollHeight * 0.5 || document.documentElement.scrollTop > document.documentElement.scrollHeight * 0.5) {
			mybutton.style.display = "block";
		} else {
			mybutton.style.display = "none";
		}
	}

	function topFunction() {
		if (document.documentElement.scrollTop || document.body.scrollTop) {
			scrollToTop();
		}
	}

	function scrollToTop() {
		const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
		if (currentScroll > 0) {
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, currentScroll - currentScroll / 24);
		}
	}
}

AOS.init();



