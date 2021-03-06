import AFRAME from 'aframe';

AFRAME.registerComponent('trash-bin-collider', {
    schema: {},
    init() {
        const scene = document.querySelector('a-scene');
        this.el.addEventListener('collide',(e) => {
            const trash = e.detail.body.el;
            if(!trash) {
                return false;
            }
            const binType = this.el.parentNode.getAttribute('trash-bin').type;
            const trashType = trash.getAttribute('trash').type;
            if (trash.isTrash && !trash.isCollided) {
                trash.isCollided = true;
                scene.systems['trash'].removeTrash(trash);
                scene.emit(`${binType == trashType ? 'increase' : 'decrease'}Score`, {points: 10});
            }
        });
    }
});
