(function($){
	"use strict";

	var osCart={
		hover$El: $('.any-class'), // выставить в false, чтоб не открывать по hover
		// TODO ?
		// click$El: $('.any-class'), // выставить в false, чтоб не открывать по клику

		closeEl: '.osCart-closeButton',
		cartEl: '.osCart',
		sliderEl: '.osCart-items',

		scrollState: $('body').css('overflow'),

		tplMain: _.template( $('#MainViewTemplate').html() ),
		tplTotal: _.template( $('#TotalViewTemplate').html() ),
		tplTitle: _.template( $('#TitleViewTemplate').html() ),
		tplSlide: _.template( $('#SlideViewTemplate').html() ),

		currency: '€',

		data: [],

		init: function(){
			var self = this;
			$('body').append('<div class="osCart notranslate"></div>');

			if( self.getOrientation() ) {
				self.minHeight();
			} else {
				self.maxheight();
			}

			self.recalcData();

			if(self.hover$El){
				self.hover$El
					.mouseenter(function(){
						self.disableScroll();
						self.render().show();
						// $(self.cartEl).show();
						self.initSlider();
					})
					/*.mouseleave(function(){
						if( !$(self.cartEl).is(':hover')) {
					    	$(self.cartEl).hide();
						}
					})*/;
			}
			// TODO ?
			/*if(self.click$El){
				$(self.closeEl)
					.on('click', function(){
						$(self.cartEl).show();
						self.initSlider();
						return false;
					});

				$(self.closeEl)
					.on('click', function(){
						$(self.cartEl).hide();
						return false;
					});
			}*/
		},

		events: function(){
			var self = this;
			
			$('.osCart-link__remove').on('click',function(){
				self.removeItem( $(this).data('index') );
				return false;
			});

			$(self.cartEl).find('.osCart-button__clear').on('click',function(){
				self.clearCart();
				return false;
			});

			$(self.cartEl).on('click',function(event){
				if($(event.target).hasClass('osCart')){
					self.hide();
					return false;
				}
			});
		},

		hide: function(){
			var self = this;

			$(self.cartEl).hide();
			self.restoreScroll();
		},

		disableScroll: function(){
			// $('body').css('overflow','hidden');
		},
		restoreScroll: function(){
			var self = this;
			// $('body').css('overflow', self.scrollState );
		},

		getOrientation: function(){
			var height = $( window ).height();

			if( height < 495){
				return true;
			}

			return false;
		},

		minHeight: function(){
			var self = this;
			$(self.cartEl).addClass('vertical');
		},
		maxheight: function(){
			var self = this;
			$(self.cartEl).removeClass('vertical');
		},

		// слайдер
		initSlider: function(){
			var self = this,
				slidesToShow = 3;

			if( self.getOrientation() ) {
				slidesToShow = 1;
				self.minHeight();
			} else {
				slidesToShow = 3;
				self.maxheight();
			}

			if( $(self.sliderEl).length ){
				$(self.sliderEl).slick({
					infinite: false,
					slidesToShow: slidesToShow,
					slidesToScroll: 1,
					dots: false,
					vertical: true
				});
			}
			self.renderTotal();
			self.renderTitle();

			self.events();
		},

		// удаляем элемент
		removeItem: function(slideIndex){
			this.data.splice(slideIndex, 1);
			$(this.sliderEl).slick('slickRemove', slideIndex );
			this.recalcIndexex();
			this.renderTotal();
			this.renderTitle();
		},
		// добавляем элемент
		// для добавления osCart.addItem(data)
		addItem: function(data){
			data = {
				id: 14, // артикул
				title: 'Заголовок товара',
				url: 'http://rambler.ru/', // ссылка на товар
				site: 'Название сайта',
				img: 'http://placehold.it/70x100/',
				size: '0M', // размер
				color: 'коричневый', // цвет
				price: 600, // цена
				number: 1 // количество
			};

			// tplSlide
			$(this.sliderEl).slick('slickAdd', this.tplSlide(data) );
			this.recalcIndexex();
			this.renderTotal();
			this.renderTitle();
		},
		clearCart: function(){
			this.data = [];
			$(this.sliderEl).slick('unslick');
			$(this.sliderEl).html('');
			this.renderTotal();
			this.renderTitle();
		},

		recalcIndexex: function(){
			_.each($(this.sliderEl).find('.osCart-link__remove'),function(el,key){
				$(el).data('index',key);
			});
		},

		recalcData: function(){
			var self = this;
			// сюда ставим ajax запрос, ответ которого осхраняем в this.data
			//this.data = testdata;
	        	$.ajax({
	                	dataType: 'json',
	                	url: 'http://bucket.catalogi.ru/bucket.php',
	                	success: function(jsondata){
	                    		self.data = jsondata;
	                	},
	                	fail: function(){
	                    		alert("error loading bucket data");
	                    		self.data = false;
	                	}
	            });
	        },

		render: function(){
			var self = this;

			if( self.data ){
				var data = {
					items: self.data,
					currency: self.currency
				};
				return $('.osCart').html( self.tplMain(data) );
			}
		},
		renderTotal: function(){
			var self = this;
			var total = 0;

			$.each(self.data,function() {
				total += parseInt(this.price) * parseInt(this.number);
			});

			var data = {
				total: total + ' ' + self.currency
			};

			return $('.osCart-total').html( self.tplTotal( data ) );
		},
		renderTitle: function(){
			var self = this;

			var data = {
				site: _.uniq( _.pluck( self.data, 'site' )),
				count: self.data.length,
			};

			return $('.osCart-title').html( self.tplTitle( data ) );
		}
	};

	var testdata = [
		{
			id: 0, // артикул
			title: 'Заголовок товара',
			url: 'http://rambler.ru/', // ссылка на товар
			site: 'Название сайта',
			img: 'http://placehold.it/70x100/',
			size: '0M', // размер
			color: 'коричневый', // цвет
			price: 600, // цена
			number: 1 // количество
		},
		{
			id: 1, // артикул
			title: 'Заголовок товара1',
			url: 'http://rambler.ru/', // ссылка на товар
			site: 'Название сайта',
			img: 'http://placehold.it/70x100/',
			size: '1M', // размер
			price: 123, // цена
			number: 4 // количество
		},
		{
			id: 2, // артикул
			title: 'Заголовок товара2',
			url: 'http://rambler.ru/', // ссылка на товар
			site: 'Название сайта',
			img: 'http://placehold.it/70x100/',
			size: '2M', // размер
			color: 'коричневый', // цвет
			price: 500, // цена
			number: 1 // количество
		},
		{
			id: 3, // артикул
			title: 'Заголовок товара3',
			url: 'http://rambler.ru/', // ссылка на товар
			site: 'Название сайта',
			img: 'http://placehold.it/70x100/',
			size: '3M', // размер
			color: 'коричневый', // цвет
			price: 123, // цена
			number: 1 // количество
		},
		{
			id: 4, // артикул
			title: 'Заголовок товара4',
			url: 'http://rambler.ru/', // ссылка на товар
			site: 'Название сайта',
			img: 'http://placehold.it/70x100/',
			size: '4M', // размер
			color: 'коричневый', // цвет
			price: 223, // цена
			number: 1 // количество
		},
		{
			id: 5, // артикул
			title: 'Заголовок товара5',
			url: 'http://rambler.ru/', // ссылка на товар
			site: 'Название сайта',
			img: 'http://placehold.it/70x100/',
			size: '5M', // размер
			price: 900, // цена
			number: 1 // количество
		},
	];

	$(document).ready(function(){
		osCart.init();
	});
}(jQuery));
