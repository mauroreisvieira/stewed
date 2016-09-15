<div class="header-description">
	<div class="container">
		<div class="master-header">
			<h1>Forms</h1>
			<div class="m-b-10"></div>
			<p>Stewed by default have 12 columns.</p>
			<p>When resizing your browser, each of these columns will always have an equal width.</p>
			<p><strong>@large desktop devices:</strong> <code class="markup"> min-width 1600px</code></p>
			<p><strong>@desktop devices:</strong> <code class="markup"> min-width 960px</code> and <code class="markup">max-width: 1599px</code></p>
			<p><strong>@tablet devices:</strong> <code class="markup"> min-width 768px</code> and <code class="markup">max-width: 959px</code></p>
			<p><strong>@mobile devices:</strong> <code class="markup"> min-width 280px</code> and <code class="markup">max-width: 767px</code></p>
		</div>
	</div>
</div>
<div class="container">
	<section>
		<div class="m-b-40"></div>
		<h2>Simple Form</h2>
		<p>Modal is positioned overlapping within the display window and is protected page content.</p>
		<div class="margin-bottom-20"></div>
		<div class="card paddin-bottom-20">
			<div class="card__container">
				<form class="form" autocomplete="off">
					<div class="row-space">
						<div class="large-12 medium-12 small-12">
							<div class="textfield">
								<input name="name" class="textfield__input" type="text">
								<label class="textfield__label" for="name">First Name</label>
							</div>
							<div class="textfield">
								<input name="surname" class="textfield__input" type="text">
								<label class="textfield__label" for="surname">Last Name</label>
							</div>
							<div class="textfield">
								<input name="email" class="textfield__input" type="text">
								<label class="textfield__label" for="surname">Email</label>
							</div>
							<div class="textfield">
								<input name="Phone" class="textfield__input" type="text">
								<label class="textfield__label" for="phone">Phone</label>
							</div>

							<div class="large-12 medium-12 small-12">
								<div class="textfield">
									<textarea name="mensagem" class="textfield__input" rows="4"></textarea>
									<label class="textfield__label" for="mensagem">Message</label>
								</div>
							</div>

							<button type="submit" class="button-medium">Send Form</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="m-b-40"></div>
		<h2>Disabled Form</h2>
		<p>Modal is positioned overlapping within the display window and is protected page content.</p>
		<div class="margin-bottom-20"></div>
		<div class="card p-b-20">
			<div class="card__container">
				<form class="form">
					<div class="row-space">
						<div class="large-12 medium-12 small-12">
							<div class="textfield">
								<textarea name="mensagem" class="textfield__input" rows="4" disabled></textarea>
								<label class="textfield__label" for="mensagem">Message Disabled</label>
							</div>

							<div class="textfield">
								<input name="Phone" class="textfield__input" type="text" disabled>
								<label class="textfield__label" for="phone">Input Disabled</label>
							</div>

							<div class="textfield">
								<select name="option" disabled>
									<option>Option 1</option>
								</select>
								<label class="textfield__label" for="option">Select Option</label>
							</div>
							<button type="submit" class="button button-large" disabled>Send Form</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div class="m-b-40"></div>
		<h2>Select Option Form</h2>
		<p>Modal is positioned overlapping within the display window and is protected page content.</p>
		<div class="margin-bottom-20"></div>
		<div class="card p-b-50">
			<div class="card-container">
				<form class="form">
					<div class="row-space">
						<div class="large-6 medium-12 small-12">
							<div class="input-field">
								<select name="option">
									<option>Option 1</option>
									<option>Option 1</option>
									<option>Option 1</option>
									<option>Option 1</option>
								</select>
								<legend for="option">Select Option</legend>
							</div>
							<div class="input-field">
								<input type="range" id="range" min="0" max="100" />
								<legend for="option">Slide Range</legend>
							</div>
							<div class="input-field">
								<label class="file-path">
									<span>File</span>
									<input type="file" class="upload" />
									<input type="text" class=""/>
								</label>
								<legend for="option">Upload the file</legend>
							</div>
						</div>
						<div class="large-3 medium-12 small-12">
							<div class="input-field">
								<label for="radio-1">
									<input type="radio" value="1" name="radio[]" id="radio-1">
									<span>Option Radio 1</span>
								</label>
								<label for="radio-2">
									<input type="radio" value="2" name="radio[]" id="radio-2">
									<span>Option Radio 2</span>
								</label>
								<label for="radio-3">
									<input type="radio" value="3" name="radio[]" id="radio-3">
									<span>Option Radio 3</span>
								</label>
								<label for="radio-4">
									<input type="radio" value="4" name="radio[]" id="radio-4">
									<span>Option Radio 4</span>
								</label>
							</div>
						</div>
						<div class="large-3 medium-12 small-12">
							<div class="input-field">
								<label for="checkbox-1">
									<input type="checkbox" value="1" name="checkbox[]" id="checkbox-1">
									<span>Option Checkbox 1</span>
								</label>
								<label for="checkbox-2">
									<input type="checkbox" value="2" name="checkbox[]" id="checkbox-2">
									<span>Option Checkbox 2</span>
								</label>
								<label for="checkbox-3">
									<input type="checkbox" value="3" name="checkbox[]" id="checkbox-3">
									<span>Option Checkbox 3</span>
								</label>
								<label for="checkbox-4">
									<input type="checkbox" value="4" name="checkbox[]" id="checkbox-4">
									<span>Option Checkbox 4</span>
								</label>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>
</div>


