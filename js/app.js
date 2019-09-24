(function() {
    let model = [
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
    ];

    let listView = {
        init: function() {
            this.container = $('#list');
            this.container.html('');
        },
        render: function(cats) {
            cats.forEach(cat => {
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
            this.container = $('#details');
            let that = this;
            $(document).on('click','#details img', function(){
                let cat = that.cat;
                cat.clickCount += 1;
                detailsView.render();
            });
        },
        showDetails: function(cat) {
            this.cat = cat;
            this.render();
        },
        render: function() {
            this.container.html('');
            let div = $('<div></div>');
            div.append(`<div>${this.cat.name}</div>`);
            div.append(`<div><img src='${this.cat.image}'></div>`);
            div.append(`<div>Counter: ${this.cat.clickCount}</div>`);
            this.container.html(div);
        }
    }

    let controller = {
        init: function() {
            listView.init();
            listView.render(model);

            detailsView.init();
        },
        showDetails: function(cat) {
            detailsView.showDetails(cat);
        }
    };

    controller.init();
})();