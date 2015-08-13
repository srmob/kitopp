require 'rubygems'
require 'pushmeup'
GCM.host = 'https://android.googleapis.com/gcm/send'
GCM.format = :json
GCM.key = "AIzaSyDHk6Rtvap13bZC7NGZsL8Iq5KAZw04piA"
destination = ["APA91bGnHbU2p6b-Tio1v9ipMyAbbNvsQD8gzOi1IlxNAC9e4B4cVR26UKe6SNLXCa375ROH_lgb3dFTXvciYmWxaSfQ_R44-AVDoFJQSfMT4C5OZd5U9LuD7eXk99uoSz1y1HSI_RJd8JqXWF9cvdbLHXeNkPkuig"]
data = {:message => "PhoneGap Build rocks!", :msgcnt => "1", :soundname => "beep.wav"}

GCM.send_notification( destination, data)
