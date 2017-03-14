namespace FavoritableMenu.Controllers
{
    using Microsoft.Bot.Builder.Dialogs;
    using Microsoft.Bot.Connector;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Serializable]
    public class BaseDialog<Type> : IDialog<Type>
    {
        public virtual Task StartAsync(IDialogContext context)
        {
            return Task.FromResult<object>(null);
        }

        protected HeroCard CreateHeroCard(string title, params string[] buttonNames)
        {
            List<CardAction> items = new List<CardAction>();
            if (buttonNames != null && buttonNames.Length > 0)
            {
                foreach (var item in buttonNames)
                {
                    CardAction cardAction = new CardAction()
                    {
                        Title = string.Concat("Intent ", item),
                        Value = item
                    };

                    items.Add(cardAction);
                }
            }

            HeroCard result = new HeroCard()
            {
                Title = title,
                Buttons = items
            };

            return result;
        }
    }
}