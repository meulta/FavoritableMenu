namespace FavoritableMenu.Controllers
{
    using Microsoft.Bot.Builder.Dialogs;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Threading.Tasks;
    using Microsoft.Bot.Connector;

    [Serializable]
    public class TopLevelDialog : BaseDialog<object>
    {
        public override async Task StartAsync(IDialogContext context)
        {
            context.Wait(MessageReceivedAsync);
        }

        public async Task MessageReceivedAsync(IDialogContext context, IAwaitable<IMessageActivity> argument)
        {
            var message = await argument;

            var replyMessage = context.MakeMessage();
            var heroCard = CreateHeroCard("Top Level", "A", "B", "C");
            replyMessage.Attachments.Add(heroCard.ToAttachment());

            await context.PostAsync(replyMessage);
            context.Wait(MessageReceivedAsync);
        }
    }
}