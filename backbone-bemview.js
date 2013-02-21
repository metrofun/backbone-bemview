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

        this.$el = jQuery(document.body);
        Backbone.View.delegateEvents.apply(this, arguments);
        this.$el = $el;

        Backbone.BEMView.delegateEvents = function () {};
    }

    Backbone.BEMView = _.extend(Backbone.View, {
        delegateEvents: delegateEvents,
        undelegateEvents: function () {
            var $el = this.$el;

            this.$el = jQuery(document.body);
            Backbone.View.undelegateEvents.apply(this, arguments);
            this.$el = $el;
            Backbone.BEMView.delegateEvents = delegateEvents;
        }
    });

    return Backbone;
}));
