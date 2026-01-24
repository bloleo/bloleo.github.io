
def read_ily(filepath, ily_words):
    count = 0
    with open(filepath, 'r', encoding='utf-8') as file:
        for line in file:
            for word in ily_words:
                if word in line:
                    count = count + 1
    return count



ily = read_ily("chat.txt", ["te amo", "Te amo", "ily", "I love y", "i love y", "te quiero mucho"])
missy = read_ily("chat.txt", ["te extraño", "Te extraño", "miss y" ])
print(ily)
print(missy)

# 215
# 30