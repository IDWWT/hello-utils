import urllib.request
import sys

def check_health(url):
    try:
        response = urllib.request.urlopen(url)
        if response.getcode() == 200:
            print(f"HTTP Health Check for {url} - OK")
        else:
            print(f"HTTP Health Check for {url} - Failed (Status Code: {response.getcode()})")
            sys.exit(1)
    except urllib.error.URLError as e:
        print(f"HTTP Health Check for {url} - Failed ({e})")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python health_check.py <URL>")
        sys.exit(1)
    url = sys.argv[1]
    check_health(url)
