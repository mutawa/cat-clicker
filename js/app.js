(function() {
    let model = {
        currentCat: 0,
        cats: [
            {
                name:'tom',
                clickCount: 0,
                image: 'img/cat1.png'
            },
            {
                name: 'felix',
                clickCount: 0,
                image: 'img/cat2.png'
            },
            {
                name: 'silvister',
                clickCount: 0,
                image: 'img/cat3.png'
            },
            {
                name: 'jaber',
                clickCount: 0,
                image: 'img/cat4.png'
            },
            {
                name: 'jony',
                clickCount: 0,
                image: 'img/cat5.png'
            }
        ]
    }

    let listView = {
        init: function() {
            this.container = $('#list');
            this.render();
        },
        render: function() {
            this.container.html('');
            controller.getAllCats().forEach(cat => {
                let div = $('<div></div>');
                div.text(cat.name);
                div.data = cat;
                div.click(function(){
                    controller.showDetails(div.data);
                });
                this.container.append(div);
            });
        }
    };

    let detailsView = {
        init: function() {
            this.name = $('#details #div-cat-name');
            this.image = $('#details #img-cat-image');
            this.counter = $('#details #div-cat-counter');

            this.image.click(function(){
                controller.incrmentCounter();
            });
            this.render();
        },
        render: function() {
            let cat = controller.getCurrentCat();

            this.name.text(cat.name);
            this.image.attr("src", cat.image);
            this.counter.text( cat.clickCount );
        }
    };

    let adminView = {
        init: function(){
            this.form = $('#cat-form');
            this.form.hide();
            this.button = $('#btnAdmin');
           
            this.name = $('#cat-form #cat-name');
            this.clickCount = $('#cat-form #cat-click-count');
            this.image = $('#cat-form #cat-image');

            this.button.click(() => {
                this.button.hide();
                let cat = controller.getCurrentCat();
                this.name.val(cat.name);
                this.image.val(cat.image);
                this.clickCount.val(cat.clickCount);

                this.form.show();
            });
            $('#btn-cancel').click((e)=>{
                this.hideForm();
                e.preventDefault();
            });
            $('#btn-save').click((e)=>{
                
                e.preventDefault();

                controller.setCurrentCat({
                    name: this.name.val(),
                    image: this.image.val(),
                    clickCount: this.clickCount.val()
                });
                this.hideForm();
                
            });
        },
        hideForm: function() {
            this.form.hide();
            this.button.show();
        }
    };
    

    let controller = {
        init: function() {
            model.currentCat = model.cats[0];

            listView.init();
            

            detailsView.init();
            
            adminView.init();
            

            
        },
        incrmentCounter: function(){
            model.currentCat.clickCount++;
            detailsView.render();
        },
        getAllCats: function() {
            return model.cats;
        },
        getCurrentCat: function(){
            return model.currentCat;
        },
        setCurrentCat: function(cat) {
            model.currentCat.name = cat.name;
            model.currentCat.clickCount = cat.clickCount;
            model.currentCat.image = cat.image;
            detailsView.render();
            listView.render();
        },
        showDetails: function(cat) {
            adminView.hideForm();
            model.currentCat = cat;
            detailsView.render();
        }
    };

    controller.init();
})();