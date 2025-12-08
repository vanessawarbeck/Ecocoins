// This is the corrected part starting from line 621
// Copy from line 1-620 of ProfilePage.tsx and append this

                  {levelThresholds.slice().reverse().map((levelItem) => {
                    const isUnlocked = totalCoins >= levelItem.coins;
                    return (
                      <div
                        key={levelItem.level}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isUnlocked
                            ? "bg-white border border-amber-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isUnlocked
                                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            <span className="text-sm">
                              {levelItem.level}
                            </span>
                          </div>
                          <div>
                            <p
                              className={`text-sm ${
                                isUnlocked
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {language === "de"
                                ? levelItem.title
                                : levelItem.titleEn}
                            </p>
                            <p className="text-xs text-gray-500">
                              {levelItem.coins > 0 ? `${levelItem.coins}+ Coins` : `${levelItem.coins} Coins`}
                            </p>
                          </div>
                        </div>
                        {isUnlocked && (
                          <CheckCircle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 bg-white border-emerald-100 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-gray-900">
                    {language === "de" ? "Letzte Aktivitäten" : "Recent Activities"}
                  </h3>
                </div>
                <div className="space-y-3">
                  {activities.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      {language === "de" ? "Noch keine Aktivitäten" : "No activities yet"}
                    </p>
                  ) : (
                    activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className={`text-sm ${
                            activity.type === "reward" ? "text-red-700" : "text-gray-700"
                          }`}>
                            {language === "de" ? activity.action : activity.actionEn}
                          </p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        <div className={`text-sm ${
                          activity.coins < 0 ? "text-red-600" : "text-emerald-600"
                        }`}>
                          {activity.coins > 0 ? "+" : ""}{activity.coins}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Rewards Section */}
        {activeTab === "rewards" && (
          <div className="space-y-4">
            {/* Stats Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-gray-900">
                    {language === "de" ? "Eingelöste Belohnungen" : "Redeemed Rewards"}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {language === "de" ? "Gesamtanzahl" : "Total Count"}
                    </p>
                    <p className="text-2xl text-emerald-600">
                      {getRedeemedRewards().length}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === "de" ? "Belohnungen" : "Rewards"}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {language === "de" ? "Ausgegeben" : "Spent"}
                    </p>
                    <p className="text-2xl text-emerald-600">
                      {getTotalRedeemedCoins().toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Coins</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Redeemed Rewards List */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-gray-800 mb-3 px-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                {language === "de" ? "Einlöse-Historie" : "Redemption History"}
              </h3>

              {getRedeemedRewards().length === 0 ? (
                <Card className="p-8 text-center bg-white border-gray-200">
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="text-gray-500">
                    {language === "de"
                      ? "Noch keine Belohnungen eingelöst"
                      : "No rewards redeemed yet"}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {language === "de"
                      ? "Gehe zu Belohnungen und löse deine ersten Coins ein!"
                      : "Go to Rewards and redeem your first coins!"}
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {getRedeemedRewards().map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                    >
                      <Card className="p-4 bg-white border-emerald-100">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{reward.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="text-gray-900">
                                  {language === "de"
                                    ? reward.rewardTitle
                                    : reward.rewardTitleEn}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {new Date(reward.timestamp).toLocaleDateString(
                                    language === "de" ? "de-DE" : "en-US",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {language === "de"
                                  ? reward.category
                                  : reward.categoryEn}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full inline-flex">
                              <span className="text-red-700 text-sm">
                                -{reward.coins}
                              </span>
                              <span className="text-xs text-red-600">Coins</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Menu Options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <Card
            className="p-4 bg-white border-emerald-100 cursor-pointer hover:bg-emerald-50 transition-colors"
            onClick={() => onNavigate?.("settings")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-gray-900">{t.settings.title}</p>
                  <p className="text-xs text-gray-500">
                    {language === "de"
                      ? "Sprache, Benachrichtigungen, Datenschutz"
                      : "Language, Notifications, Privacy"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>

          <Card
            className="p-4 bg-white border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => {
              localStorage.removeItem("onboardingComplete");
              window.location.reload();
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-900">
                    {language === "de"
                      ? "Onboarding zurücksetzen"
                      : "Reset Onboarding"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === "de"
                      ? "Einführung erneut anzeigen"
                      : "Show introduction again"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Avatar Selector Modal */}
      <AvatarSelector
        isOpen={isAvatarSelectorOpen}
        onClose={() => setIsAvatarSelectorOpen(false)}
        currentAvatar={profileImage}
        onSelectAvatar={handleSelectAvatar}
        userName={userName}
      />
    </div>
  );
}
