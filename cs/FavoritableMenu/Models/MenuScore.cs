using Microsoft.Bot.Builder.Dialogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FavoritableMenu.Models
{
    public class MenuScore
    {
        private IBotDataBag data;
        private const string MenuScoringKey = "MenuScoring";

        public MenuScore(IBotDataBag value)
        {
            data = value;
        }

        public MenuScoreItem GetMenuScore(string actionName)
        {
            MenuScoreItem result = null;

            if (!string.IsNullOrEmpty(actionName))
            {
                List<MenuScoreItem> items = null;
                if (data.TryGetValue(MenuScoringKey, out items))
                {
                    result = items
                        .Where(p => p.ActionName == actionName)
                        .FirstOrDefault();
                }
            }

            return result;
        }

        public void SetMenuScore(string actionName, string actionLabel)
        {
            if (!string.IsNullOrEmpty(actionName) && !string.IsNullOrEmpty(actionLabel))
            {
                List<MenuScoreItem> items = null;
                if (!data.TryGetValue(MenuScoringKey, out items))
                {
                    items = new List<MenuScoreItem>();
                    data.SetValue(MenuScoringKey, items);
                }

                if (items != null)
                {
                    MenuScoreItem value = items
                        .Where(p => p.ActionName == actionName)
                        .FirstOrDefault();

                    if (value != null)
                    {
                        value.Count++;
                    }
                    else
                    {
                        items.Add(new MenuScoreItem()
                        {
                            ActionName = actionLabel,
                            Label = actionLabel,
                            Count = 1
                        });
                    }

                    data.SetValue(MenuScoringKey, items);
                }
            }
        }
    }
}