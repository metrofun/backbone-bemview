/*global _, Backbone */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], function (_, Backbone) {
            // Use global variables if the locals are undefined.
            return factory(_ || root._, Backbone || root.Backbone);
        });
    } else {
        // RequireJS isn't being used.
        // Assume underscore and backbone are loaded in <script> tags
        factory(_, Backbone);
    }
}(this, function (_, Backbone) {
    function delegateEvents() {
        var $el = this.$el;

        // swap $el with document.body
        // and use originate delegateEvents
        this.$el = jQuery(document.body);
        Backbone.View.prototype.delegateEvents.apply(this, arguments);
        this.$el = $el;

        // We need delegate only once for every contructor,
        // so we add another "delegateEvents"
        // preceding to current in prototype chain
        this.constructor.prototype.delegateEvents = function () {};
    }

    Backbone.BEMView = function () {
        return Backbone.View.apply(this, arguments);
    };
    Backbone.BEMView.extend = Backbone.View.extend;
    _.extend(Backbone.BEMView.prototype, new Backbone.View(), {
        delegateEvents: delegateEvents,
        undelegateEvents: function () {
            var $el = this.$el;

            this.$el = jQuery(document.body);
            Backbone.View.prototype.undelegateEvents.apply(this, arguments);
            this.$el = $el;

            // If events were undelegated,
            // then restore our "delegateEvents"
            // by removing preceding one in prototype chain
            delete this.constructor.delegateEvents;
        }
    });

    return Backbone;
}));
