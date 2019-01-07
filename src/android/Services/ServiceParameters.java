package org.apache.cordova.overApps.Services;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

import java.util.Map;

public class ServiceParameters {

	SharedPreferences ServiceSettings;
	Editor editor;
	public static final String APP_PREFERENCES = "ServicePrefs";
	Context context;
	private Map<String, ?> allSettings;


	public ServiceParameters(Context context)
	{
		this.context = context;
	}

	private void openConnection()
	{
		ServiceSettings = context.getSharedPreferences(APP_PREFERENCES, Context.MODE_PRIVATE);
		editor = ServiceSettings.edit();
	}

	private void closeConnection()
	{
		editor = null;
		ServiceSettings = null;
	}

	public void setInt(int value,String key)
	{
		openConnection();
		editor.putInt(key, value);
		editor.commit();
		closeConnection();
	}
	public void setLoong(long value,String key)
	{
		openConnection();
		editor.putLong(key, value);
		editor.commit();
		closeConnection();
	}
	public void setFloat(float value,String key)
	{
		openConnection();
		editor.putFloat(key, value);
		editor.commit();
		closeConnection();
	}
	public void setString(String value, String key)
	{
		openConnection();
		editor.putString(key, value);
		editor.commit();
		closeConnection();
	}


	public void setBoolean(Boolean value, String key)
	{
		openConnection();
		editor.putBoolean(key, value);
		editor.commit();
		closeConnection();
	}


	public boolean getBoolean(String key, boolean defValue)
	{
		boolean result = defValue;
		openConnection();

		if (ServiceSettings.contains(key)) {
			result = ServiceSettings.getBoolean(key, defValue);
		}

		closeConnection();
		return result;
	}

	public int getInt(String key)
	{
		int result = 0;
		openConnection();

		if (ServiceSettings.contains(key)) {
			result = ServiceSettings.getInt(key, 0);
		}

		closeConnection();
		return result;
	}

	public int getInt(String key, int defValue)
	{
		int result = defValue;
		openConnection();

		if (ServiceSettings.contains(key)) {
			result = ServiceSettings.getInt(key, defValue);
		}

		closeConnection();
		return result;
	}

	public float getFloat(String key)
	{
		float result = 0;
		openConnection();

		if (ServiceSettings.contains(key)) {
			result = ServiceSettings.getFloat(key, 0);
		}

		closeConnection();
		return result;
	}
	public String getString(String key)
	{
		String result = "";
		openConnection();

		if (ServiceSettings.contains(key)) {
			result = ServiceSettings.getString(key, "");
		}

		closeConnection();
		return result;
	}

	public String getString(String key, String strdefault)
	{
		String result = strdefault;
		openConnection();

		if (ServiceSettings.contains(key)) {
			result = ServiceSettings.getString(key, strdefault);
		}

		closeConnection();
		return result;
	}
	public long getLoong(String key, long defValue)
	{
		long result = defValue;
		openConnection();

		if (ServiceSettings.contains(key)) {
			result = ServiceSettings.getLong(key, defValue);
		}else{
			setLoong(defValue,key);
		}

		closeConnection();
		return result;
	}



	public String getAllSettings() {
		openConnection();

		Map<String,?> keys = ServiceSettings.getAll();

//		for(Map.Entry<String,?> entry : keys.entrySet()){
//			Log.d("map values",entry.getKey() + ": " +
//					entry.getValue().toString());
//		}

		String allSettings=keys.toString();
		closeConnection();
		return allSettings;
	}

	public void clearAllSettings() {
		openConnection();
		editor.clear();
		editor.commit();
		closeConnection();
	}

	public void clearAllSettings(String parameterToKeepKey) {
		String parameterToKeep = getString(parameterToKeepKey);
		openConnection();
		editor.clear();
		editor.commit();
		closeConnection();
		setString(parameterToKeep,parameterToKeepKey);
	}
}
