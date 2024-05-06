function log(text) {
	document.getElementById("data").innerText += text + "\n";
}
document.querySelector("button.viewall").addEventListener("click", function () {
	chrome.tabs.create({
		url: "/projects/index.html"
	})
})

chrome.runtime.sendMessage({ meta: "getUsernamePlus" }, function (info) {
	let username = info.uname


	function setSignedin(info) {
		if (info.signedin) {
			document.getElementById('loggedout').style.display = 'none'
			document.getElementById('normal').style.display = 'unset'
		} else {
			document.getElementById('loggedout').style.display = 'unset'
			document.getElementById('normal').style.display = 'none'
		}
	}
	setSignedin(info)

	setTimeout(() => { chrome.runtime.sendMessage({ meta: "getUsernamePlus" }, setSignedin) }, 1000)

	document.getElementById("listtitle").innerHTML = username + "'s Friends&nbsp;List"


	let alreadyAdded = {}

	function addFriendGUI(name) {
		console.log(name)
		if (name?.toLowerCase() in alreadyAdded) { return }
		alreadyAdded[name.toLowerCase()] = true

		let item = document.createElement('li')
		item.username = name
		item.innerHTML = `<span class="friend-name" >@${name}</span>  <span class="x" href="page2.html">x</span>`;
		item.onclick = async (e) => {
			if (e.target?.classList?.contains('x')) { removeFriend(name) }
			else { chrome.tabs.create({ url: `https://scratch.mit.edu/users/${name}` }); }
		}

		document.getElementById("friends").appendChild(item)
	}

	function addFriend(name) {
		if (name.toLowerCase() in alreadyAdded) { return }
		if (name.toLowerCase() == username.toLowerCase()) { return }
		if (!name.trim()) { return }
		if (name.includes(' ')) { return }
		document.getElementById("search").value = ''
		addFriendGUI(name)
		fetch(`https://spore.us.to:4000/friends/${username}/${name}`, { method: "POST" });
	}

	function removeFriend(name) {
		delete alreadyAdded[name.toLowerCase()]
		for (let child of document.getElementById("friends").children) {
			if (child.username == name) { child.remove(); break; }
		}
		fetch(`https://spore.us.to:4000/friends/${username}/${name}`, { method: "DELETE" });
	}

	document.getElementById("search").addEventListener("keyup", event => {
		if (event.key == "Enter") {
			addFriend(document.getElementById("search").value)
		}
	});
	document.getElementById("submit").addEventListener("click", () => {
		addFriend(document.getElementById("search").value)
	})


	// populate with current friends
	fetch(`https://spore.us.to:4000/friends/${username}`)
		.then((res) => { document.getElementById("friends").innerHTML = ''; return res })
		.then(res => res.json().then(list => list.forEach(addFriendGUI)))
		.catch(() => { document.getElementById("friends").innerHTML = '<span style="color:red;">Error: Request Failed :(<span>' })
});


document.getElementById('discord').onclick = () => {
	chrome.tabs.create({ url: `https:\/\/discord.gg/9ZQQhvAvqp` });
}
document.getElementById('uptime').onclick = () => {
	chrome.tabs.create({ url: `https://status.uptime-monitor.io/6499c89d4bfb79bb5f20ac4d` });
}
document.getElementById('support').onclick = () => {
	chrome.tabs.create({ url: `https://www.buymeacoffee.com/ilhp10` });
}
document.getElementById('rgantzos').onclick = () => {
	chrome.tabs.create({ url: `https://scratch.mit.edu/users/rgantzos` });
}
document.getElementById('ilhp10').onclick = () => {
	chrome.tabs.create({ url: `https://scratch.mit.edu/users/ilhp10` });
}

/// request permissions
(async () => {
	document.getElementById("notifs").checked = (await chrome.storage.local.get(['notifs']))?.notifs ?? false
})()
document.getElementById("notifs").addEventListener('change', (event) => {
	let on = event.currentTarget.checked;
	chrome.storage.local.set({ notifs: on })
	// Permissions must be requested from inside a user gesture, like a button's
	// click handler.
	chrome.permissions.request({
		permissions: ['notifications'],
	}, (granted) => {
		// The callback argument will be true if the user granted the permissions.
		if (granted) {
			// doSomething();
		} else {
			chrome.storage.local.set({ notifs: false })
			document.getElementById("notifs").checked = false;
		}
	});
});

/// request permissions
(async () => {
	document.getElementById("ping").checked = (await chrome.storage.local.get(['ping']))?.ping ?? false
})()
document.getElementById("ping").addEventListener('change', (event) => {
	let on = event.currentTarget.checked;
	chrome.storage.local.set({ ping: on })
	// Permissions must be requested from inside a user gesture, like a button's
	// click handler.
});