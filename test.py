import requests

url = "https://apis.sourcearena.ir/api/?token=e8d89d42f2f78e565b71f170866d30c2&currency"
# url = "https://rahavard365.com/api/v2/market-data/stocks?last_trade=last_trading_day"
success_count = 0
fail_count = 0

for i in range(75010):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            success_count += 1
        else:
            fail_count += 1
            print(f"Request {i + 1} failed with status code: {response.status_code}")
    except Exception as e:
        fail_count += 1
        print(f"Request {i + 1} raised exception: {e}")

print("\nSummary:")
print(f"✅ Successful requests: {success_count}")
print(f"❌ Failed requests: {fail_count}")
