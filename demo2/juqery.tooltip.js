(function($) {
    // 创建部件
    $.widget('ljq.tooltip', {
        _create: function() {
            // 在这个函数的上下文中，this引用的是当前部件实例
            this._tooltipDiv = $('<div></div>')
            .addClass('ui-widget ui-state-highlight ui-corner-all')
            .hide().appendTo('body');
            this.element
            .addClass('ljq-tooltip-trigger')
            .on('mouseenter.ljq-tooltip',
            // 使用proxy方法改变_open方法中的this指向，使其指向部件实例
            $.proxy(this._open, this))
            .on('mouseleave.ljg-tooltip',
            $.proxy(this._close, this))
        },
        destroy: function() {
            this._tooltipDiv.remove();
            this.element
              .removeClass('ljq-tooltip-trigger')
              .off('.ljq-tooltip');
            $.Widget.prototype.destroy.apply(this, arguments);
        },
        _open: function() {
            if (!this.options.disabled) {
                var elementOffset = this.element.offset();
                this._tooltipDiv.css({
                    padding: '5px',
                    position: 'absolute',
                    left: elementOffset.left + this.options.offsetX,
                    top: elementOffset.top + this.element.height() + this.options.offsetY,
                }).text(this.options.content.call(this.element[0]));
                this._tooltipDiv.show();
                this._trigger('opens');
            }
        },
        _close: function() {
            this._tooltipDiv.hide();
            this._trigger('close');
        },
        // 手动打开提示条
        open: function() {
            this._open();
        },
        // 手动关闭提示条
        close: function() {
            this._close();
        },
        // 检测提示条是否正在显示
        isOpen: function() {
            return Boolean($('.ui-widget.ui-state-highlight.ui-corner-all:visible')[0]);
        }
    });
})(jQuery);