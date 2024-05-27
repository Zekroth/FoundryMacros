async function restActor(actor, tokenDocument, hours) {
    await actor.restActor()
    // You can extend the period of rest to a full 24 hours. At the end of this time, you heal damage equal to twice your healing rate instead.
    if (hours == 24) await actor.applyHealing(true)
    await tokenDocument.setFlag("world", "LastRestEndTime", game.time.worldTime + (hours * 3600))
}

let confirmed = false;
new Dialog({
    title: "Rest for n hours",
    content: `
    <form>
        <div class="form-group">
            <table>
                <tr>
                    <td><input id="selectedHours" name="selectedHours" value="0"></input></td>
                    <td><label>Hours</label></td>
                </tr>
            </table>
        </div>
    </form>`,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Roll!",
            callback: () => confirmed = true
        }
    },
    default: "Cancel",
    close: html => {
        if (confirmed) {
            let hours = parseInt(html.find('[name=selectedHours]')[0].value);
            restActor(token.actor, token, hours);
        }
    }

}).render(true);